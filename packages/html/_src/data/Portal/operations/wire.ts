import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus getter effect/html/Portal wire
 */
export function wire(
  self: Portal
): Wire | Node | null | undefined {
  concretePortal(self)
  return self.wire
}
