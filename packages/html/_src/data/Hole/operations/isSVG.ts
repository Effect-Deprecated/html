import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus getter ets/Hole isSVG
 */
export function isSVG(self: Hole): boolean {
  concreteHole(self)
  return self.type === "svg"
}
