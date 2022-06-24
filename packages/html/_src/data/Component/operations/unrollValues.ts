/**
 * the stack retains, per each interpolation value, the cache
 * related to each interpolation value, or null, if the render
 * was conditional and the value is not special (Array or Hole)
 *
 * @tsplus fluent ets/Component unrollValues
 */
export function unrollValues(
  self: Component,
  values: Array<unknown>
): Effect<any, any, Chunk<Maybe<Effect.UIO<void>>>> {
  return Chunk.from(values).zipWithIndex.mapEffect((tp) => {
    const { tuple: [value, index] } = tp

    return self.unrollValue(value, index, values)
  })
}
