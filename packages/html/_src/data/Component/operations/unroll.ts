/**
 * as html and svg can be nested calls, but no parent component is known
 * until rendered somewhere, the unroll operation is needed to
 * discover what to do with each interpolation, which will result
 * into an update operation.
 *
 * @tsplus fluent ets/Component unroll
 */
export function unroll(
  self: Component,
  hole: Hole
): Effect<
  TemplateCache,
  Template.InvalidElementException | Template.MissingNodeException,
  Wire | ChildNode | ParentNode
> {
  return self.entry.flatMap((entry) =>
    entry.isNone() || !(entry.value == hole) ?
      self.setEntryEffect(hole.toEntry) :
      Effect.succeed(() => entry.value)
  )
    .tap((entry) =>
      hole.values.take(1).tap((_) =>
        self.unrollValues(_).map((_) => _.collect(identity)).flatMap((updates) =>
          updates.isEmpty ?
            Effect.unit :
            hole.updateValuesEffect((_) => updates.mapEffectDiscard(identity).as(_))
        )
      ).map(Chunk.from).tap((_) =>
        _.zipWithIndex.mapEffectDiscard((tp) => {
          const { tuple: [value, index] } = tp

          return entry.updateWithValue(index, value)
        })
      ).runDrain()
    ).flatMap((entry) => entry.toWire)
}
