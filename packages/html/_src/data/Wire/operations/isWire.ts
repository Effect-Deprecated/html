import { InternalWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus static effect/html/Wire/Ops isWire
 */
export function isWire(
  u: unknown
): u is Wire {
  return u instanceof InternalWire
}
