import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus fluent effect/html/Portal removeChild
 */
export function removeChild(
  self: Portal,
  index: number
): void {
  concretePortal(self)

  self.children[index] = null
}
