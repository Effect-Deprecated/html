import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus getter effect/html/Entry type
 */
export function type(
  self: Entry
): "html" | "svg" {
  concreteEntry(self)

  return self.type
}
