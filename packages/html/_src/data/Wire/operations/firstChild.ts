import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire firstChild
 */
export function firstChild(
  self: Wire
): ChildNode {
  concreteWire(self)

  if (self.firstChild == undefined) {
    throw new Wire.NoFirstChildException()
  }

  return self.firstChild
}
