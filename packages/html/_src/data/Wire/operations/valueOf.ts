import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire valueOf
 */
export function valueOf(
  self: Wire
): ParentNode {
  concreteWire(self)

  if (self.node.childNodes.length !== self.nodes.length) {
    // TODO: why??? when does this occur?
    self.node.append(...self.nodes)
  }

  return self.node
}
