import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire nodeType
 */
export function nodeType(
  self: Wire
): number {
  concreteWire(self)

  return self.nodeType
}
