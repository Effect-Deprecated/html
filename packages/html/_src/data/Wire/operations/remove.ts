import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire remove
 */
export function remove(
  self: Wire
): ChildNode {
  concreteWire(self)

  if (self.firstChild == null) {
    throw new Wire.NoFirstChildException()
  }

  if (self.lastChild == null) {
    throw new Wire.NoLastChildException()
  }

  const range = document.createRange()

  range.setStartAfter(self.firstChild)
  range.setEndAfter(self.lastChild)
  range.deleteContents()

  return self.firstChild
}
