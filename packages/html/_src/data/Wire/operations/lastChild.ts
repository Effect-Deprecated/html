import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter ets/Wire lastChild
 */
export function lastChild(
  self: Wire
): Maybe<ChildNode> {
  concreteWire(self)

  return self.lastChild
}
