import { InternalInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus static effect/html/Interpolation/Ops isInterpolation
 */
export function isInterpolation(u: unknown): u is Interpolation {
  return u instanceof InternalInterpolation
}
