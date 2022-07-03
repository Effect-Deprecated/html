import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus fluent effect/html/Portal getEntry
 */
export function getEntry(
  self: Portal,
  interpolation: Interpolation
): Entry {
  concretePortal(self)
  // if the cache entry is either null or different from the template
  // and the type of the given interpolation create a new entry
  // assigning a new content fragment and the list of updates.
  if (
    !self.entry || self.entry.templateStringsArray !== interpolation.templateStringsArray ||
    self.entry.type !== interpolation.type
  ) {
    self.entry = interpolation.toEntry
  }

  return self.entry
}
