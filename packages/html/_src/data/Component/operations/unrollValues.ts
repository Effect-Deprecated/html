/**
 * the stack retains, per each interpolation value, the cache
 * related to each interpolation value, or null, if the render
 * was conditional and the value is not special (Array or Hole)
 *
 * @tsplus fluent ets/Component unrollValues
 */
export function unrollValues(self: Component, values: Array<unknown>): Effect.UIO<number> {
  const { length } = values
  return Chunk.from(values).zipWithIndex.mapEffectDiscard((tp) => {
    const { tuple: [value, index] } = tp
    // each Hole gets unrolled and re-assigned as value
    // so that domdiff will deal with a component/wire, not with a hole
    if (Hole.isHole(value)) {
      return self.getOrSetStackEntry(index).map((_) => _.unroll(value)).unit()
    }

    // arrays are recursively resolved so that each component will contain
    // also a DOM component or a wire, hence it can be diffed if/when needed
    if (Array.isArray(value)) {
      return self.getOrSetStackEntry(index).map((_) => unrollValues(_, value)).unit()
    }

    // if the value is nothing special, the stack doesn't need to retain data
    // this is useful also to cleanup previously retained data, if the value
    // was a Hole, or an Array, but not anymore, i.e.:
    // const update = content => html`<div>${content}</div>`;
    // update(listOfItems); update(null); update(html`hole`)
    return self.removeStackEntry(index)
  }).zipRight(
    self.stackLength.tap((stackLength) =>
      length < stackLength ? self.spliceStack(length).as(length) : Effect.succeed(length)
    )
  )
}
