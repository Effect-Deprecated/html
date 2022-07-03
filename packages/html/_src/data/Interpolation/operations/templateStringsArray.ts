import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus getter effect/html/Interpolation templateStringsArray
 */
export function templateStringsArray(
  self: Interpolation
): TemplateStringsArray {
  concreteInterpolation(self)

  return self.template
}
