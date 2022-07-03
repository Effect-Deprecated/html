import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus getter effect/html/Interpolation values
 */
export function values(
  self: Interpolation
): Array<Placeholder.Value> | Array<Portal.Values> {
  concreteInterpolation(self)

  return self.values
}
