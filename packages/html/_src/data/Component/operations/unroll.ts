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
): Effect<TemplateCache, Template.InvalidElementException | Template.MissingNodeException, Wire> {
  return Effect.Do()
    .bind("values", () => hole.values)
    .tap(({ values }) => self.unrollValues(values))
    .bind(
      "entry",
      () =>
        self.entry.flatMap((entry) =>
          entry.isNone() || !(entry.value == hole) ?
            self.setEntryEffect(hole.toEntry) :
            Effect.succeed(() => entry.value)
        )
    )
    .tap(({ entry, values }) =>
      Chunk.from(values).zipWithIndex.mapEffectDiscard((tp) => {
        const { tuple: [value, index] } = tp

        return entry.updateWithValue(index, value)
      })
    ).flatMap(({ entry }) => entry.toWire)
}
