import { NoneInternal } from "@effect/html/data/None/operations/_internal/NoneInternal"

/**
 * @tsplus static effect/html/None/Ops isNone
 */
export function isNone(u: unknown): u is None {
  return u instanceof NoneInternal
}
