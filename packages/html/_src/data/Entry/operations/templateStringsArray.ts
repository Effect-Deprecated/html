import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus getter effect/html/Entry templateStringsArray
 */
export function templateStringsArray(
  self: Entry
): TemplateStringsArray {
  concreteEntry(self)

  return self.template
}
