import { concretePortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus fluent effect/html/Portal setWire
 */
export function setWire(
  self: Portal,
  wire: Wire | Node
): void {
  concretePortal(self)
  self.wire = wire
}
