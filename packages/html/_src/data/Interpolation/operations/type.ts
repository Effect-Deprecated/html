import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus getter effect/html/Interpolation type
 */
export function type(
  self: Interpolation
): "html" | "svg" {
  concreteInterpolation(self)

  return self.type
}
