import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus fluent effect/html/Portal spliceChildren
 */
export function spliceChildren(
  self: Portal,
  length: number
): void {
  concretePortal(self)

  if (length < self.children.length) {
    self.children.splice(length)
  }
}
