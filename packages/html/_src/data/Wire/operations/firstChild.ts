import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire firstChild
 */
export function firstChild(
  self: Wire
): Maybe<ChildNode> {
  concreteWire(self)

  return self.firstChild
}
