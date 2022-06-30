// both `html` and `svg` template literal tags are polluted
// with a `for(ref[, id])` and a `node` tag too
interface Tag {
  <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    ...values: A
  ): Effect<Placeholder.Env<A>, never, Hole>
  for(
    ref: object,
    id: unknown
  ): <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    ...placeholders: A
  ) => Effect<Placeholder.Env<A>, never, Node | Wire | Hole>
  node: <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    ...values: A
  ) => Effect<
    Placeholder.Env<A>,
    Template.InvalidElementException | Template.MissingNodeException,
    Node
  >
}

function tag(
  type: "html" | "svg"
): Tag {
  const keyed = WeakCache.empty<
    object,
    HashMap<
      unknown,
      <A extends Array<Placeholder<any>>>(
        template: TemplateStringsArray,
        placeholders: A
      ) => Effect<Placeholder.Env<A>, never, Hole>
    >
  >()

  return Object.assign(
    // non keyed operations are recognized as instance of Hole
    // during the "unroll", recursively resolved and updated
    <A extends Array<Placeholder<any>>>(
      template: TemplateStringsArray,
      ...placeholders: A
    ): Effect<Placeholder.Env<A>, never, Hole> =>
      Collection(placeholders).map((values) => Hole(type, template, values)),
    {
      // keyed operations need a reference object, usually the parent node
      // which is showing keyed results, and optionally a unique id per each
      // related node, handy with JSON results and mutable list of objects
      // that usually carry a unique identifier
      for(
        ref: object,
        id: unknown
      ) {
        return <A extends Array<Placeholder<any>>>(
          template: TemplateStringsArray,
          ...placeholders: A
        ): Effect<Placeholder.Env<A>, never, Node | Wire | Hole> =>
          keyed.getOrElseEffect(ref, keyed.set(ref, HashMap.empty())).flatMap((memo) =>
            Effect.succeed(memo.get(id)).flatMap((fixed) =>
              fixed.isNone() ?
                Component.empty().flatMap((_) => _.fixed(template, placeholders)) :
                fixed.value(template, placeholders)
            )
          )
      },
      // it is possible to create one-off content out of the box via node tag
      // this might return the single created node, or a fragment with all
      // nodes present at the root level and, of course, their Placeholder nodes
      node: <A extends Array<Placeholder<any>>>(
        template: TemplateStringsArray,
        ...placeholders: A
      ): Effect<Placeholder.Env<A>, never, Node> =>
        Component.empty().zip(
          Collection(placeholders).map((values) => Hole(type, template, values))
        ).flatMap((tp) => {
          const { tuple: [component, hole] } = tp

          return component.unroll(hole).flatMap((_) => Wire.isWire(_) ? _.valueOf : Effect.succeed(_.valueOf() as Node))
        })
    }
  )
}

export function render<A extends Element, R, E, B extends (Hole | HTMLOrSVGElement)>(
  where: A,
  fa: Effect<R, E, B>
) {
  return withHooks(
    fa,
    (hole) =>
      ComponentCache.getOrElseEffect(where, ComponentCache.setEffect(where, Component.empty())).flatMap((info) =>
        (Hole.isHole(hole) ? info.unroll(hole) : Effect.succeed(hole as HTMLOrSVGElement)).flatMap((wire) =>
          info.updateWire(wire)
        ).flatMap(
          (wire) => {
            if (wire.isSome()) {
              // valueOf() simply returns the node itself, but in case it was a "wire"
              // it will eventually re-append all nodes to its fragment so that such
              // fragment can be re-appended many times in a meaningful way
              // (wires are basically persistent fragments facades with special behavior)
              return (Wire.isWire(wire.value) ?
                wire.value.valueOf :
                Effect.succeed(wire.value.valueOf() as Node)).flatMap((node) =>
                  Effect.succeed(() => where.replaceChildren(node))
                ).as(where)
            }
            return Effect.succeed(where)
          }
        )
      )
  )
}

export const html = tag("html")
export const svg = tag("svg")

export function bootstrap<E, A>(fa: Effect<never, E, A>): Promise<A> {
  return fa.tapErrorTrace((trace) => Effect.succeed(() => console.error(trace.stackTrace))).unsafeRunPromise()
}
