// both `html` and `svg` template literal tags are polluted
// with a `for(ref[, id])` and a `node` tag too
const tag = type => {
  // both `html` and `svg` tags have their own cache
  const keyed = new WeakMapSet()
  // keyed operations always re-use the same cache and unroll
  // the template and its interpolations right away
  const fixed = cache =>
    (template, ...values) =>
      unroll(
        cache,
        { type, template, values }
      )
  return Object.assign(
    // non keyed operations are recognized as instance of Hole
    // during the "unroll", recursively resolved and updated
    (template, ...values) => new Hole(type, template, values),
    {
      // keyed operations need a reference object, usually the parent node
      // which is showing keyed results, and Maybeally a unique id per each
      // related node, handy with JSON results and mutable list of objects
      // that usually carry a unique identifier
      for(ref, id) {
        const memo = keyed.get(ref) || keyed.set(ref, new MapSet())
        return memo.get(id) || memo.set(id, fixed(createCache()))
      },
      // it is possible to create one-off content out of the box via node tag
      // this might return the single created node, or a fragment with all
      // nodes present at the root level and, of course, their child nodes
      node: (template, ...values) => unroll(createCache(), new Hole(type, template, values)).valueOf()
    }
  )
}

type Renderable = Hole | HTMLOrSVGElement

function render<A extends Element>(
  where: A,
  what: LazyArg<Renderable>
): Effect<ComponentCache | TemplateCache, Template.InvalidElementException, A> {
  const hole = what()

  return ComponentCache.getOrElseEffect(where, Component.empty()).flatMap((info) =>
    (Hole.isHole(hole) ? info.unroll(hole) : Effect.succeed(hole)).flatMap((wire) => info.updateWire(wire)).flatMap(
      (wire) => {
        if (wire.isSome()) {
          // valueOf() simply returns the node itself, but in case it was a "wire"
          // it will eventually re-append all nodes to its fragment so that such
          // fragment can be re-appended many times in a meaningful way
          // (wires are basically persistent fragments facades with special behavior)
          Effect.succeed(() => where.replaceChildren(wire.value as unknown as Node)).as(where)
        }
        return Effect.succeed(where)
      }
    )
  )
}
