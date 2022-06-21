import { concreteEntry, InternalEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus fluent ets/Entry/Ops updateWithValue
 */
export function updateWithValue<V>(
  self: Entry,
  index: number,
  value: V
): Effect.UIO<void> {
  concreteEntry(self)
  const fa = self.updates.get(index)

  if (fa.isSome()) {
    return fa.value(value).fork().unit()
  }

  return Effect.unit
}
