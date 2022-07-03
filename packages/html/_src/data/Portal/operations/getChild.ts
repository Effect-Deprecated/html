import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus fluent effect/html/Portal getChild
 */
export function getChild(
  self: Portal,
  index: number
): Portal {
  concretePortal(self)
  return self.children[index] ?? (self.children[index] = Portal.empty())
}
