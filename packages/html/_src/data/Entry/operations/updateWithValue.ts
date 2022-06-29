import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus fluent effect/html/Entry updateWithValue
 */
export function updateWithValue(
  self: Entry,
  index: number,
  value: Component.Values
): Effect.UIO<void> {
  concreteEntry(self)
  const fa = self.updates.get(index)

  if (fa.isSome()) {
    // @ts-expect-error
    return fa.value(value).unit()
  }

  return Effect.unit
}
