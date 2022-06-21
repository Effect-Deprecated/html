import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter ets/Wire nodeType
 */
export function nodeType(
  self: Wire
): number {
  concreteWire(self)

  return self.nodeType
}
