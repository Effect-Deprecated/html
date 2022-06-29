import { ManyInternal } from "@effect/html/data/Many/operations/_internal/ManyInternal"

/**
 * @tsplus static effect/html/Many/Ops isMany
 */
export function isMany(u: unknown): u is Many {
  return u instanceof ManyInternal
}
