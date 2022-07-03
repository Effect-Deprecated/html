import { InternalInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus static effect/html/Interpolation/Ops __call
 */
export function make(
  type: "html" | "svg",
  template: TemplateStringsArray,
  values: Many
): Interpolation {
  return new InternalInterpolation(type, template, values.toArray)
}
