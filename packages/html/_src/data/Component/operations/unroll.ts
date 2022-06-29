/**
 * as html and svg can be nested calls, but no parent component is known
 * until rendered somewhere, the unroll operation is needed to
 * discover what to do with each interpolation, which will result
 * into an update operation.
 *
 * @tsplus fluent effect/html/Component unroll
 */
export function unroll(
  self: Component,
  hole: Hole
): Effect.UIO<
  Wire | ChildNode | ParentNode
> {
  return self.entry.flatMap((entry) =>
    entry.isNone() || !(entry.value == hole) ?
      self.setEntryEffect(hole.toEntry) :
      Effect.succeed(() => entry.value)
  )
    .tap((entry) =>
      self.unrollValues(hole.values).tap((_) =>
        _.zipWithIndex.mapEffectDiscard((tp) => {
          const { tuple: [value, index] } = tp

          return entry.updateWithValue(index, value)
        })
      )
    )
    .flatMap((entry) => entry.toWire)
}
