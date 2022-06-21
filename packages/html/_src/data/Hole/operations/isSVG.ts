import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus getter ets/Hole isSVG
 */
export function values(self: Hole): boolean {
  concreteHole(self)
  return self.type === "svg"
}
