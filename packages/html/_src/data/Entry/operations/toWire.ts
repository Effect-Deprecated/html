import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static effect/html/Wire/Ops fromEntry
 * @tsplus getter effect/html/Entry toWire
 */
export function toWire(
  self: Entry
): Wire | Node {
  concreteEntry(self)

  if (self.wire == undefined) {
    if (self.content.firstChild === self.content.lastChild) {
      if (self.content.lastChild != undefined) {
        self.wire = self.content.lastChild
      } else {
        self.wire = self.content
      }
    } else {
      self.wire = Wire(self.content)
    }
  }

  return self.wire
}
