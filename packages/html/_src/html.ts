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

type Renderable<A> = Hole<A> | HTMLElement | SVGElement

// as html and svg can be nested calls, but no parent node is known
// until rendered somewhere, the unroll operation is needed to
// discover what to do with each interpolation, which will result
// into an update operation.
function unroll<A, B, C>(info: TemplateCache.Entry<A, B, C>, { template, type, values }: TemplateCache.Hole<B>) {
  // interpolations can contain holes and arrays, so these need
  // to be recursively discovered
  const length = unrollValues(info, values)
  let { entry } = info
  // if the cache entry is either null or different from the template
  // and the type this unroll should resolve, create a new entry
  // assigning a new content fragment and the list of updates.
  if (entry.isNone() || (entry.value.template !== template || entry.value.type !== type)) {
    info.entry = entry = createEntry(type, template)
  }
  const { content, updates, wire } = entry
  // even if the fragment and its nodes is not live yet,
  // it is already possible to update via interpolations values.
  for (let i = 0; i < length; i++) {
    updates[i](values[i])
  }
  // if the entry was new, or representing a different template or type,
  // create a new persistent entity to use during diffing.
  // This is simply a DOM node, when the template has a single container,
  // as in `<p></p>`, or a "wire" in `<p></p><p></p>` and similar cases.
  return wire || (entry.wire = persistent(content))
}

// the stack retains, per each interpolation value, the cache
// related to each interpolation value, or null, if the render
// was conditional and the value is not special (Array or Hole)
function unrollValues<A, B, C, D>(entry: TemplateCache.Entry<A, B, C>, values: Chunk<D>): Effect.UIO<number> {
  values.zipWithIndex.mapEffectDiscard((tp) => {
    // each Hole gets unrolled and re-assigned as value
    // so that domdiff will deal with a node/wire, not with a hole
    if (TemplateCache.Hole.isHole(tp.get(0))) {
      entry.getOrSetStackEntry(tp.get(1))
      values[i] = unroll(
        stack[i] || (stack[i] = createCacheEntry()),
        hole
      )
    } // arrays are recursively resolved so that each entry will contain
    // also a DOM node or a wire, hence it can be diffed if/when needed
    else if (isArray(hole)) {
      unrollValues(stack[i] || (stack[i] = createCacheEntry()), hole)
    } // if the value is nothing special, the stack doesn't need to retain data
    // this is useful also to cleanup previously retained data, if the value
    // was a Hole, or an Array, but not anymore, i.e.:
    // const update = content => html`<div>${content}</div>`;
    // update(listOfItems); update(null); update(html`hole`)
    else {
      stack[i] = null
    }
  })

  if (length < stack.length) {
    stack.splice(length)
  }
  return length
}

function render<N extends Node, A>(where: N, what: LazyArg<Renderable<A>>): Effect<TemplateCache, never, N> {
  const hole = what()

  return TemplateCache.getOrE(where).map((info) => {
    const wire = hole instanceof Hole ? unroll(info, hole) : hole
    if (wire !== info.wire) {
      info.wire = wire
      // valueOf() simply returns the node itself, but in case it was a "wire"
      // it will eventually re-append all nodes to its fragment so that such
      // fragment can be re-appended many times in a meaningful way
      // (wires are basically persistent fragments facades with special behavior)
      where.replaceChildren(wire.valueOf())
    }
    return where
  })
}
