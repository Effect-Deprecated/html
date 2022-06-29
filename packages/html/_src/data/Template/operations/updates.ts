import { concreteTemplate } from "@effect/html/data/Template/operations/_internal/InternalTemplate"

export function whileDiscard<Z>(
  initial: LazyArg<Z>,
  cont: (z: Z) => boolean
) {
  return <R, E>(
    body: (z: Z) => Effect<R, E, Z>,
    __tsplusTrace?: string
  ): Effect<R, E, void> => {
    return Effect.suspendSucceed(() => {
      const initial0 = initial()
      return cont(initial0)
        ? body(initial0).flatMap((s) => whileDiscard(s, cont)(body))
        : Effect.unit
    })
  }
}

function isNode(u: unknown): u is Node {
  return u instanceof Node
}

function isElement(u: unknown): u is Element {
  return u instanceof Element
}

function diffable(
  node: Maybe<Node | Wire>,
  operation: number
): Effect<never, Wire.NoFirstChildException | Wire.NoLastChildException, Node> {
  return Effect.fromMaybe(node).flatMap((node) => {
    if (Wire.isWire(node)) {
      if ((1 / operation) < 0) {
        if (operation) {
          return node.remove
        }

        return Effect.fromMaybe(node.lastChild).mapError(() => new Wire.NoLastChildException())
      }

      if (operation) {
        return node.valueOf
      }

      return Effect.fromMaybe(node.firstChild).mapError(() => new Wire.NoFirstChildException())
    }

    return Effect.succeed(node)
  })
}

function synchronize(
  parentNode: ParentNode,
  a: Array<Node | Wire>,
  b: Array<Node | Wire>,
  get: (
    node: Maybe<Node | Wire>,
    operation: number
  ) => Effect<never, Wire.NoFirstChildException | Wire.NoLastChildException, Node>,
  before: Node
): Effect.UIO<
  Array<Node | Wire>
> {
  return whileDiscard({
    bLength: b.length,
    aEnd: a.length,
    bEnd: b.length,
    aStart: 0,
    bStart: 0,
    map: HashMap.empty<Node | Wire, number>()
  }, ({ aEnd, aStart, bEnd, bStart }) => aStart < aEnd || bStart < bEnd)((s) => {
    if (s.aEnd === s.aStart) {
      // we could be in a situation where the rest of nodes that
      // need to be added are not at the end, and in such case
      // the node to `insertBefore`, if the index is more than 0
      // must be retrieved, otherwise it's gonna be the first item.
      return (
        s.bEnd > s.bLength ?
          (s.bStart ?
            get(Maybe.fromNullable(b[s.bStart - 1]), -0).flatMap(({ nextSibling }) =>
              Effect.fromMaybe(Maybe.fromNullable(nextSibling)).mapError(() => new Template.NoNextSiblingException())
            ) :
            get(Maybe.fromNullable(b[s.bEnd - s.bStart]), 0)) :
          Effect.succeed(before)
      ).flatMap((node) =>
        Effect.loop(s.bStart, (bStart) => bStart < s.bEnd, (_) => _ + 1)((bStart) =>
          get(Maybe.fromNullable(b[bStart]), 1)
            .flatMap((_) => Effect.succeed(() => parentNode.insertBefore(_, node)))
            .as(bStart)
        ).map((_) => _.unsafeLast!)
      ).map((bStart) => {
        s.bStart = bStart + 1

        return s
      })
    }

    // remove head or tail: fast path
    if (s.bEnd === s.bStart) {
      return Effect.loop(s.aStart, (aStart) => aStart < s.aEnd, (_) => _ + 1)((aStart) =>
        get(Maybe.fromNullable(a[aStart]), -1)
          .flatMap((_) =>
            s.map.isEmpty || !s.map.has(_) ? Effect.succeed(() => parentNode.removeChild(_)) : Effect.unit
          )
          .as(aStart)
      ).map((_) => _.unsafeLast!).map((aStart) => {
        s.aStart = aStart + 1

        return s
      })
    }

    // same node: fast path
    if (a[s.aStart] === b[s.bStart]) {
      return Effect.succeed(() => {
        s.aStart = s.aStart + 1
        s.bStart = s.bStart + 1

        return s
      })
    }

    // same tail: fast path
    if (a[s.aEnd - 1] === b[s.bEnd - 1]) {
      return Effect.succeed(() => {
        s.aEnd = s.aEnd - 1
        s.bEnd = s.bEnd - 1

        return s
      })
    }

    // The once here single last swap "fast path" has been removed in v1.1.0
    // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
    // reverse swap: also fast path
    if (
      a[s.aStart] === b[s.bEnd - 1] &&
      b[s.bStart] === a[s.aEnd - 1]
    ) {
      // this is a "shrink" operation that could happen in these cases:
      // [1, 2, 3, 4, 5]
      // [1, 4, 3, 2, 5]
      // or asymmetric too
      // [1, 2, 3, 4, 5]
      // [1, 2, 3, 5, 6, 4]
      return get(Maybe.fromNullable(a[s.aEnd]), -1)
        .flatMap(({ nextSibling }) =>
          Effect.fromMaybe(Maybe.fromNullable(nextSibling)).mapError(() => new Template.NoNextSiblingException())
        )
        .flatMap((node) =>
          get(Maybe.fromNullable(b[s.bEnd]), 1).flatMap((_) => Effect.succeed(() => parentNode.insertBefore(_, node)))
        )
        .zipRight(get(Maybe.fromNullable(b[s.bStart]), 1))
        .zip(
          get(Maybe.fromNullable(a[s.aStart]), -1).flatMap(({ nextSibling }) =>
            Effect.fromMaybe(Maybe.fromNullable(nextSibling)).mapError(() => new Template.NoNextSiblingException())
          )
        )
        .flatMap((tp) => {
          const { tuple: [node, childNode] } = tp

          return Effect.succeed(() =>
            parentNode.insertBefore(
              node,
              childNode
            )
          )
        }).tap(() =>
          Effect.succeed(() => {
            // mark the future index as identical (yeah, it's dirty, but cheap 👍)
            // The main reason to do this, is that when a[aEnd] will be reached,
            // the loop will likely be on the fast path, as identical to b[bEnd].
            // In the best case scenario, the next loop will skip the tail,
            // but in the worst one, this node will be considered as already
            // processed, bailing out pretty quickly from the map index check
            a[s.aEnd] = b[s.bEnd]!
          })
        ).as(() => {
          s.aEnd = s.aEnd - 1
          s.bEnd = s.bEnd - 1
          s.aStart = s.aStart + 1
          s.bStart = s.bStart + 1

          return s
        })
    }

    // the map requires an O(bEnd - bStart) operation once
    // to store all future nodes indexes for later purposes.
    // In the worst case scenario, this is a full O(N) cost,
    // and such scenario happens at least when all nodes are different,
    // but also if both first and last items of the lists are different
    if (s.map.isEmpty) {
      return Effect.succeed(() => {
        let i = s.bStart
        let map = HashMap.empty<Wire | Node, number>()
        while (i < s.bEnd) {
          const node = Maybe.fromNullable(b[i])

          if (node.isSome()) {
            map = map.set(node.value, i++)
          }
        }

        s.map = map

        return s
      })
    }
    // if it's a future node, hence it needs some handling
    if (s.map.has(a[s.aStart])) {
      // grab the index of such node, 'cause it might have been processed
      const index = s.map.unsafeGet(a[s.aStart])
      // if it's not already processed, look on demand for the next LCS
      if (s.bStart < index && index < s.bEnd) {
        let i = s.aStart
        // counts the amount of nodes that are the same in the future
        let sequence = 1
        while (++i < s.aEnd && i < s.bEnd && s.map.unsafeGet(a[i]) === (index + sequence)) {
          sequence++
        }
        // effort decision here: if the sequence is longer than replaces
        // needed to reach such sequence, which would brings again this loop
        // to the fast path, prepend the difference before a sequence,
        // and move only the future list index forward, so that aStart
        // and bStart will be aligned again, hence on the fast path.
        // An example considering aStart and bStart are both 0:
        // a: [1, 2, 3, 4]
        // b: [7, 1, 2, 3, 6]
        // this would place 7 before 1 and, from that time on, 1, 2, and 3
        // will be processed at zero cost
        if (sequence > (index - s.bStart)) {
          return get(Maybe.fromNullable(a[s.aStart]), 0).flatMap((childNode) =>
            Effect.loop(s.bStart, (bStart) => bStart < index, (_) => _ + 1)((bStart) =>
              get(Maybe.fromNullable(b[bStart]), 1).flatMap((node) =>
                Effect.succeed(() => parentNode.insertBefore(node, childNode))
              ).as(bStart)
            )
          ).map((_) => _.unsafeLast!).map((bStart) => {
            s.bStart = bStart + 1

            return s
          })
        }

        // if the effort wasn't good enough, fallback to a replace,
        // moving both source and target indexes forward, hoping that some
        // similar node will be found later on, to go back to the fast path
        return Effect.struct({
          node: get(Maybe.fromNullable(b[s.bStart]), 1),
          childNode: get(Maybe.fromNullable(b[s.aStart]), -1)
        }).flatMap(({ childNode, node }) =>
          Effect.succeed(() =>
            parentNode.replaceChild(
              node,
              childNode
            )
          )
        ).as(() => {
          s.bStart = s.bStart + 1
          s.aStart = s.aStart + 1

          return s
        })
      }

      // otherwise move the source forward, 'cause there's nothing to do
      return Effect.succeed(() => {
        s.aStart = s.aStart + 1

        return s
      })
    } // this node has no meaning in the future list, so it's more than safe
    // to remove it, and check the next live node out instead, meaning
    // that only the live list index should be forwarded
    return get(Maybe.fromNullable(a[s.aStart]), -1).flatMap((node) =>
      Effect.succeed(() => parentNode.removeChild(node))
    ).as(() => {
      s.aStart = s.aStart + 1

      return s
    })
  }).as(b).orDie()
}

function diff(comment: Node, oldNodes: Array<Node | Wire>, newNodes: Array<Node | Wire>): Effect.UIO<
  Array<Node | Wire>
> {
  return Effect.fromMaybe(Maybe.fromNullable(comment.parentNode)).mapError(() => new Template.NoParentNodeException())
    .flatMap((parentNode) =>
      synchronize(
        parentNode,
        // TODO: there is a possible edge case where a node has been
        //       removed manually, or it was a keyed one, attached
        //       to a shared reference between renders.
        //       In this case udomdiff might fail at removing such node
        //       as its parent won't be the expected one.
        //       The best way to avoid this issue is to filter oldNodes
        //       in search of those not live, or not in the current parent
        //       anymore, but this would require both a change to uwire,
        //       exposing a parentNode from the firstChild, as example,
        //       but also a filter per each diff that should exclude nodes
        //       that are not in there, penalizing performance quite a lot.
        //       As this has been also a potential issue with domdiff,
        //       and both lighterhtml and hyperHTML might fail with this
        //       very specific edge case, I might as well document this possible
        //       "diffing shenanigan" and call it a day.
        oldNodes,
        newNodes,
        diffable,
        comment
      )
    ).orDie()
}

function anyContent(
  oldValueRef: Ref.Synchronized<Maybe<Component.Values>>,
  textRef: Ref.Synchronized<Maybe<Text>>,
  nodesRef: Ref.Synchronized<Array<Node | Wire>>,
  comment: Node,
  newValue: Component.Values
): Effect.UIO<void> {
  return oldValueRef.updateSomeEffect(
    (
      oldValue
    ) => {
      switch (typeof newValue) {
        // primitives are handled as text content
        case "string":
        case "number":
        case "boolean":
          if (oldValue != Maybe.some(newValue)) {
            return Maybe.some(
              textRef.updateAndGetEffect((text) =>
                Effect.fromMaybe(text).flatMap((_) =>
                  Effect.succeed(() => {
                    _.data = newValue.toString()
                  }).as(_)
                ).catchAll(() => Effect.succeed(() => document.createTextNode(String(newValue)))).asSome()
              ).flatMap((_) => Effect.fromMaybe(_).mapError(() => new Template.NoTextNodeException())).flatMap((text) =>
                nodesRef.updateAndGetEffect((nodes) => diff(comment, nodes, [text]))
              ).as(newValue)
                .asSome().orDie()
            )
          }
          break
        // null, and undefined are used to cleanup previous content
        case "object":
          if (Placeholder.isNone(newValue)) {
            if (oldValue != Maybe.some(newValue)) {
              return Maybe.some(
                nodesRef.updateEffect((nodes) => diff(comment, nodes, [])).as(newValue).asSome().orDie()
              )
            }

            return Maybe.none
          }
          // arrays and nodes have a special treatment
          if (Chunk.isChunk(newValue)) {
            // arrays can be used to cleanup, if empty
            // or diffed, if these contains nodes or "wires"
            if (newValue.isEmpty || Wire.isWire(newValue.unsafeGet(0)) || isNode(newValue.unsafeGet(0))) {
              return Maybe.some(
                nodesRef.updateEffect((nodes) =>
                  diff(comment, nodes, newValue.filter((_): _ is Wire | Node => Wire.isWire(_) || isNode(_)).toArray)
                ).as(newValue).asSome().orDie()
              )
            }
            // in all other cases the content is stringified as is
            return Maybe.some(
              Effect.succeed(String(newValue)).flatMap((value) =>
                anyContent(oldValueRef, textRef, nodesRef, comment, value).as(value).asSome()
              )
            )
          }
          // if the new value is a DOM node, or a wire, and it's
          // different from the one already live, then it's diffed.
          // if the node is a fragment, it's appended once via its childNodes
          // There is no `else` here, meaning if the content
          // is not expected one, nothing happens, as easy as that.
          if (oldValue != Maybe.some(newValue) && (Wire.isWire(newValue) || isNode(newValue))) {
            return Maybe.some(
              nodesRef.updateEffect((nodes) => {
                const newNodes = Chunk.builder<Node | Wire>()

                if ((Wire.isWire(newValue) && newValue.nodeType === 11)) {
                  newValue.childNodes.forEach(newNodes.append)
                } else if ((isNode(newValue) && newValue.nodeType === 11)) {
                  newValue.childNodes.forEach(newNodes.append)
                } else {
                  newNodes.append(newValue)
                }

                return diff(comment, nodes, newNodes.build().toArray)
              }).as(newValue).asSome().orDie()
            )
          }
          break
      }

      return Maybe.none
    }
  )
}

function handleAnything(comment: Node) {
  return Effect.struct({
    oldValue: Ref.Synchronized.make<Maybe<Component.Values>>(Maybe.none),
    text: Ref.Synchronized.make<Maybe<Text>>(Maybe.none),
    nodes: Ref.Synchronized.make<Array<Node | Wire>>(Array.empty)
  })
    .map(({ nodes, oldValue, text }) =>
      (newValue: Component.Values) => anyContent(oldValue, text, nodes, comment, newValue)
    )
}

function event(
  node: Element,
  name: string
): Effect.UIO<(newValue: EventListenerOrEventListenerObject) => Effect.UIO<void>> {
  let lower: string
  let type = name.slice(2)
  if (!(name in node) && (lower = name.toLowerCase()) in node) {
    type = lower.slice(2)
  }

  return Ref.Synchronized.make<Maybe<EventListenerOrEventListenerObject>>(Maybe.none).map((ref) =>
    (newValue: EventListenerOrEventListenerObject) =>
      ref.updateSomeEffect((oldValue) => {
        if (oldValue != Maybe.some(newValue)) {
          return Maybe.some(
            Effect.fromMaybe(oldValue).flatMap((_) =>
              Effect.succeed(() => node.removeEventListener(type, _))
                .as(oldValue)
            ).catchAll(() => Effect.unit).zipRight(
              Effect.succeed(() => node.addEventListener(type, newValue))
                .as(Maybe.some(newValue))
            )
          )
        }

        return Maybe.none
      })
  )
}

function attribute<R, E extends Event>(node: Element, name: string): Effect.UIO<Template.Update> {
  const attributeNode = document.createAttributeNS(null, name)
  return Ref.Synchronized.make<{ orphan: boolean; oldValue: Maybe<string> }>({ orphan: true, oldValue: Maybe.none })
    .map((ref) =>
      (newValue: string) =>
        ref.updateSomeEffect(({ oldValue, orphan }) => {
          if (oldValue != Maybe.some(newValue)) {
            return Maybe.some(
              Effect.fromMaybe(Maybe.fromNullable(newValue)).flatMap((value) =>
                Effect.succeed(() => {
                  attributeNode.value = value
                  if (orphan) {
                    node.setAttributeNodeNS(attributeNode)
                    return { orphan: false, oldValue: Maybe.some(value) }
                  }

                  return { orphan, oldValue: Maybe.some(value) }
                })
              ).catchAll(() => {
                if (!orphan) {
                  Effect.succeed(() => {
                    node.removeAttributeNode(attributeNode)
                  }).as({ orphan: true, oldValue: Maybe.none })
                }

                return Effect.succeed({ orphan, oldValue: Maybe.none })
              })
            )
          }
          return Maybe.none
        })
    )
}

// attributes can be:
//  * onevent=${...}   to explicitly handle event listeners
//  * generic=${...}  to handle an attribute just like an attribute
function handleAttribute<R>(
  node: Element,
  name: string
): Effect.UIO<Template.Update> {
  if (name[0] === "0" && name[1] === "n") {
    return event(node, name)
  }

  return attribute(node, name)
}

function text(node: Node): Effect.UIO<Template.Update> {
  return Ref.Synchronized.make<Maybe<string>>(Maybe.none).map((ref) =>
    (newValue: string) =>
      ref.updateSomeEffect((oldValue) => {
        const value = Maybe.fromNullable(newValue)
        if (oldValue != value) {
          return Maybe.some(
            Effect.succeed(() => {
              node.textContent = value.getOrElse("")
            }).as(newValue).asSome()
          )
        }

        return Maybe.none
      })
  )
}

function handlers<R>(
  fragment: DocumentFragment
) {
  return ({ name, path }: Template.Node): Effect.UIO<
    Template.Update
  > =>
    Effect.fromMaybe(
      path.reduceRight(
        Maybe.some<Node>(fragment),
        (i, childNode) => childNode.flatMap(({ childNodes }) => Maybe.fromNullable(childNodes[i]))
      )
    ).mapError(() => new Template.MissingNodeException()).flatMap((node) => {
      if (isNode(node)) {
        return handleAnything(node)
      }

      if (isElement(node)) {
        if (name.isNone()) {
          return Effect.fail(new Template.MissingNameException())
        }
        return handleAttribute(node, name.value)
      }

      return text(node)
    }).orDie()
}

/**
 * @tsplus fluent effect/html/Template updates
 */
export function updates<R>(
  self: Template,
  fragment: DocumentFragment
): Effect.UIO<
  ImmutableArray<Template.Update>
> {
  concreteTemplate(self)
  // relate an update handler per each node that needs one
  return Chunk.from(self.nodes).mapEffect(handlers(fragment)).map((_) => _.toImmutableArray)
}
