import { Base } from "@effect/core/io/Effect"

/**
 * This function is mutating one of it's arguments! This is supposed to run as an effect inside a Ref.updateEffect or similar constructs
 *
 * @tsplus fluent ets/Component unrollValue
 */
export function unrollValue(
  self: Component,
  value: unknown,
  index: number,
  values: Array<unknown>
): Effect<TemplateCache, Template.InvalidElementException | Template.MissingNodeException, Maybe<Effect.UIO<void>>> {
  if (value instanceof Base) {
    return value.flatMap((_) => self.unrollValue(_, index, values)) as Effect.UIO<Maybe<Effect.UIO<void>>>
  }

  // each Hole gets unrolled and re-assigned as value
  // so that domdiff will deal with a component/wire, not with a hole
  if (Hole.isHole(value)) {
    return self.getOrSetStackEntry(index).flatMap((_) => _.unroll(value)).map((_) =>
      Maybe.some(Effect.succeed(() => values[index] = _))
    )
  }

  // arrays are recursively resolved so that each component will contain
  // also a DOM component or a wire, hence it can be diffed if/when needed
  if (Array.isArray(value)) {
    return self.getOrSetStackEntry(index).flatMap((_) => _.unrollValues(value)).map((_) => _.collect(identity)).map((
      _
    ) => _.isEmpty ? Maybe.none : Maybe.some(_.mapEffectDiscard(identity))) as Effect.UIO<Maybe<Effect.UIO<void>>>
  }

  // if the value is nothing special, the stack doesn't need to retain data
  // this is useful also to cleanup previously retained data, if the value
  // was a Hole, or an Array, but not anymore, i.e.:
  // const update = content => html`<div>${content}</div>`;
  // update(listOfItems); update(null); update(html`hole`)
  return self.removeStackEntry(index).as(Maybe.none)
}
