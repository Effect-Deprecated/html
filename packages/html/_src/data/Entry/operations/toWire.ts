import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static effect/html/Wire/Ops fromEntry
 * @tsplus getter effect/html/Entry toWire
 */
export function toWire(
  self: Entry
): Wire | Node {
  concreteEntry(self)

  if (self.wire == null) {
    if (self.content.firstChild === self.content.lastChild) {
      if (self.content.lastChild != null) {
        self.wire = self.content.lastChild
      }

      self.wire = self.content
    }

    self.wire = Wire(self.content)
  }

  return self.wire
}
