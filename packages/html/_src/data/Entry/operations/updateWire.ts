import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus fluent ets/Entry updateWire
 */
export function updateWire<V>(
  self: Entry,
  index: number,
  value: V
): Effect<never, any, void> {
  concreteEntry(self)
  const fa = self.updates.get(index)

  if (fa.isSome()) {
    return fa.value(value).unit()
  }

  return Effect.unit
}
