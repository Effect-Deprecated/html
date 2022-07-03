import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus getter effect/html/Interpolation isSVG
 */
export function isSVG(self: Interpolation): boolean {
  concreteInterpolation(self)
  return self.type === "svg"
}
