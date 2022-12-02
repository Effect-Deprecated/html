import { concreteElementRef } from "@effect/html/data/ElementRef/operations/_internal/ElementRefInternal"
import { concreteTemplate } from "@effect/html/data/Template/operations/_internal/InternalTemplate"

function isNode(u: unknown): u is Node {
  return u instanceof Node
}

function isElement(u: unknown): u is Element {
  return u instanceof Element
}

function isDocumentFragment(u: unknown): u is DocumentFragment {
  return u instanceof DocumentFragment
}

function diffable(
  node: Node | Wire | undefined | null,
  operation: number
): Node {
  if (node == undefined) {
    throw new Template.MissingNodeException()
  }

  if (Wire.isWire(node)) {
    if ((1 / operation) < 0) {
      if (operation) {
        return node.remove
      }

      return node.lastChild
    }

    if (operation) {
      return node.valueOf
    }

    return node.firstChild
  }

  return node
}

function synchronize(
  parentNode: ParentNode,
  a: NodeListOf<ChildNode> | Array<Node | Wire | null | undefined>,
  b: NodeListOf<ChildNode> | Array<Node | Wire | null | undefined>,
  get: (
    node: Node | Wire | null | undefined,
    operation: number
  ) => Node,
  before: Node
): NodeListOf<ChildNode> | Array<Node | Wire | null | undefined> {
  const bLength = b.length
  let aEnd = a.length
  let bEnd = bLength
  let aStart = 0
  let bStart = 0
  let map = null
  while (aStart < aEnd || bStart < bEnd) {
    // append head, tail, or nodes in between: fast path
    if (aEnd === aStart) {
      // we could be in a situation where the rest of nodes that
      // need to be added are not at the end, and in such case
      // the node to `insertBefore`, if the index is more than 0
      // must be retrieved, otherwise it's gonna be the first item.
      const node = bEnd < bLength ?
        (bStart ?
          (get(b[bStart - 1], -0).nextSibling) :
          get(b[bEnd - bStart], 0)) :
        before
      while (bStart < bEnd) {
        parentNode.insertBefore(get(b[bStart++], 1), node)
      }
    } // remove head or tail: fast path
    else if (bEnd === bStart) {
      while (aStart < aEnd) {
        // remove the node only if it's unknown or not live
        if (!map || !map.has(a[aStart])) {
          parentNode.removeChild(get(a[aStart], -1))
        }
        aStart++
      }
    } // same node: fast path
    else if (a[aStart] === b[bStart]) {
      aStart++
      bStart++
    } // same tail: fast path
    else if (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--
      bEnd--
    } // The once here single last swap "fast path" has been removed in v1.1.0
    // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
    // reverse swap: also fast path
    else if (
      a[aStart] === b[bEnd - 1] &&
      b[bStart] === a[aEnd - 1]
    ) {
      // this is a "shrink" operation that could happen in these cases:
      // [1, 2, 3, 4, 5]
      // [1, 4, 3, 2, 5]
      // or asymmetric too
      // [1, 2, 3, 4, 5]
      // [1, 2, 3, 5, 6, 4]
      const node = get(a[--aEnd], -1).nextSibling
      parentNode.insertBefore(
        get(b[bStart++], 1),
        get(a[aStart++], -1).nextSibling
      )
      parentNode.insertBefore(get(b[--bEnd], 1), node)
      // mark the future index as identical (yeah, it's dirty, but cheap 👍)
      // The main reason to do this, is that when a[aEnd] will be reached,
      // the loop will likely be on the fast path, as identical to b[bEnd].
      // In the best case scenario, the next loop will skip the tail,
      // but in the worst one, this node will be considered as already
      // processed, bailing out pretty quickly from the map index check
      a[aEnd] = b[bEnd]
    } // map based fallback, "slow" path
    else {
      // the map requires an O(bEnd - bStart) operation once
      // to store all future nodes indexes for later purposes.
      // In the worst case scenario, this is a full O(N) cost,
      // and such scenario happens at least when all nodes are different,
      // but also if both first and last items of the lists are different
      if (!map) {
        map = new Map()
        let i = bStart
        while (i < bEnd) {
          map.set(b[i], i++)
        }
      }
      // if it's a future node, hence it needs some handling
      if (map.has(a[aStart])) {
        // grab the index of such node, 'cause it might have been processed
        const index = map.get(a[aStart])
        // if it's not already processed, look on demand for the next LCS
        if (bStart < index && index < bEnd) {
          let i = aStart
          // counts the amount of nodes that are the same in the future
          let sequence = 1
          while (++i < aEnd && i < bEnd && map.get(a[i]) === (index + sequence)) {
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
          if (sequence > (index - bStart)) {
            const node = get(a[aStart], 0)
            while (bStart < index) {
              parentNode.insertBefore(get(b[bStart++], 1), node)
            }
          } // if the effort wasn't good enough, fallback to a replace,
          // moving both source and target indexes forward, hoping that some
          // similar node will be found later on, to go back to the fast path
          else {
            parentNode.replaceChild(
              get(b[bStart++], 1),
              get(a[aStart++], -1)
            )
          }
        } // otherwise move the source forward, 'cause there's nothing to do
        else {
          aStart++
        }
      } // this node has no meaning in the future list, so it's more than safe
      // to remove it, and check the next live node out instead, meaning
      // that only the live list index should be forwarded
      else {
        parentNode.removeChild(get(a[aStart++], -1))
      }
    }
  }
  return b
}

function diff(
  comment: Node,
  oldNodes: NodeListOf<ChildNode> | Array<Node | Wire | null | undefined>,
  newNodes: NodeListOf<ChildNode> | Array<Node | Wire | null | undefined>
): NodeListOf<ChildNode> | Array<Node | Wire | null | undefined> {
  if (comment.parentNode == undefined) {
    throw new Template.NoParentNodeException()
  }
  return synchronize(
    comment.parentNode,
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
}

function handlePrimitive(
  text: Text | null | undefined,
  nodes: NodeListOf<ChildNode> | Array<Node | Wire | null | undefined>,
  comment: Node,
  newValue: string
): NodeListOf<ChildNode> | Array<Node | Wire | null | undefined> {
  if (!text) {
    text = document.createTextNode("")
  }
  text.data = newValue
  return diff(comment, nodes, [text])
}

// if an interpolation represents a comment, the whole
// diffing will be related to such comment.
// This helper is in charge of understanding how the new
// content for such interpolation/interpolation should be updated
function handleAnything(comment: Node): (newValue: Portal.Values) => void {
  let oldValue: Portal.Values
  let text: Text | null | undefined
  let nodes: NodeListOf<ChildNode> | Array<Node | Wire | null | undefined> = []

  return (newValue) => {
    switch (typeof newValue) {
      // primitives are handled as text content
      case "string":
      case "number":
      case "boolean":
        if (oldValue !== newValue) {
          oldValue = newValue
          nodes = handlePrimitive(text, nodes, comment, newValue.toString())
        }
        break
      case "object":
      case "undefined":
        if (newValue == undefined) {
          if (oldValue != newValue) {
            oldValue = newValue
            nodes = diff(comment, nodes, [])
          }
          break
        }

        // arrays and nodes have a special treatment
        if (Array.isArray(newValue)) {
          oldValue = newValue
          // arrays can be used to cleanup, if empty
          if (newValue.length === 0) {
            nodes = diff(comment, nodes, [])
            break
          }
          // or diffed, if these contains nodes or "wires"
          // we assume the array to contain only wires/nodes if the head is so
          if (Wire.isWire(newValue[0]) || isNode(newValue[0])) {
            nodes = diff(comment, nodes, newValue as Array<Node | Wire | null | undefined>)
            break
          }

          // in all other cases the content is stringified as is
          nodes = handlePrimitive(text, nodes, comment, String(newValue))

          break
        }
        // if the new value is a DOM node, or a wire, and it's
        // different from the one already live, then it's diffed.
        // if the node is a fragment, it's appended once via its childNodes
        // There is no `else` here, meaning if the content
        // is not expected one, nothing happens, as easy as that.
        if (oldValue !== newValue && (Wire.isWire(newValue) || isNode(newValue))) {
          oldValue = newValue
          nodes = diff(
            comment,
            nodes,
            isDocumentFragment(newValue) ?
              // @TODO: This never seems to be triggered?
              newValue.childNodes :
              [newValue]
          )
        }
        break
    }
  }
}

function event(
  node: Element,
  name: string
): (newValue: EventListenerOrEventListenerObject | null | undefined) => void {
  let lower: string
  let oldValue: EventListenerOrEventListenerObject | null | undefined
  let type = name.slice(2)
  if (!(name in node) && (lower = name.toLowerCase()) in node) {
    type = lower.slice(2)
  }

  return (newValue) => {
    if (oldValue !== newValue) {
      if (oldValue != undefined) {
        node.removeEventListener(type, oldValue)
      }

      if (newValue != undefined) {
        node.addEventListener(type, newValue)
      }

      oldValue = newValue
    }
  }
}

function attribute<R, E extends Event>(node: Element, name: string): (newValue: string | null | undefined) => void {
  let oldValue: string | null | undefined
  let orphan = true
  const attributeNode = document.createAttributeNS(null, name)

  return (newValue) => {
    if (oldValue !== newValue) {
      if (newValue == undefined) {
        if (!orphan) {
          node.removeAttributeNode(attributeNode)
          orphan = true
        }
      } else {
        attributeNode.value = newValue

        if (orphan) {
          node.setAttributeNodeNS(attributeNode)
          orphan = false
        }
      }

      oldValue = newValue
    }
  }
}

export function ref(node: Element | null | undefined): (newValue: ElementRef | null | undefined) => void {
  let oldValue: ElementRef | null | undefined

  return (newValue) => {
    if (oldValue !== newValue) {
      if (ElementRef.isElementRef(oldValue)) {
        concreteElementRef(oldValue)
        oldValue.ref.set(Maybe.none)
      }

      oldValue = newValue
      if (newValue != undefined) {
        concreteElementRef(newValue)
        newValue.ref.set(Maybe.fromNullable(node))
      }
    }
  }
}

// attributes can be:
//  * ref=${...}      for hooks and other purposes
//  * onevent=${...}   to explicitly handle event listeners
//  * generic=${...}  to handle an attribute just like an attribute
function handleAttribute<R>(
  node: Element,
  name: string
): Template.Update {
  if (name[0] === "o" && name[1] === "n") {
    return event(node, name)
  }

  switch (name) {
    case "ref":
      return ref(node)
  }

  return attribute(node, name)
}

function text(node: Node): Template.Update {
  let oldValue: string | null | undefined
  return (newValue: string | null | undefined) => {
    if (oldValue != newValue) {
      oldValue = newValue

      node.textContent = newValue == undefined ? "" : newValue
    }
  }
}

// each mapped update carries the update type and its path
// the type is either node, attribute, or text, while
// the path is how to retrieve the related node to update.
// In the attribute case, the attribute name is also carried along.
function handlers(
  fragment: Node,
  { name, path, type }: Template.Node
): Template.Update {
  const node = path.reduceRight(({ childNodes }, i) => {
    const node = childNodes[i]

    if (node == undefined) {
      throw new Template.MissingNodeException()
    }

    return node
  }, fragment)
  if (type === "node") {
    return handleAnything(node)
  }

  if (type === "attr" && isElement(node)) {
    if (name == undefined) {
      throw new Template.MissingAttributeNameException()
    }
    return handleAttribute(node, name)
  }

  if (type === "text") {
    return text(node)
  }

  return () => {
    //
  }
}

/**
 * Relate an update handler per each node that needs one
 *
 * @tsplus fluent effect/html/Template updates
 */
export function updates(
  self: Template,
  fragment: DocumentFragment
): Array<Template.Update> {
  concreteTemplate(self)
  // relate an update handler per each node that needs one
  return self.nodes.map((_) => handlers(fragment, _))
}
