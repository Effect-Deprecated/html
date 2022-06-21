import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter ets/Wire childNodes
 */
export function childNodes(
  self: Wire
): Array<Node> {
  concreteWire(self)

  return self.nodes.toArray
}
