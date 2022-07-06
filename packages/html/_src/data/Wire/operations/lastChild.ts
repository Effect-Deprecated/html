import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire lastChild
 */
export function lastChild(
  self: Wire
): ChildNode {
  concreteWire(self)

  if (self.lastChild == undefined) {
    throw new Wire.NoLastChildException()
  }

  return self.lastChild
}
