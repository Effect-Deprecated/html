import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus fluent effect/html/Entry update
 */
export function update(
  self: Entry,
  values: Array<Portal.Values>
): Entry {
  concreteEntry(self)

  for (let i = 0; i < self.updates.length; i++) {
    const f = self.updates[i]

    if (f == undefined) {
      throw new Entry.MissingAttributeUpdateHandlerException()
    }

    f(values[i] as never)
  }

  return self
}
