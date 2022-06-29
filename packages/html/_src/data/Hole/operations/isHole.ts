import { InternalHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus static effect/html/Hole/Ops isHole
 */
export function isHole(u: unknown): u is Hole {
  return u instanceof InternalHole
}
