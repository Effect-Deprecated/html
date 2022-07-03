import { InternalPortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus static effect/html/Portal/Ops empty
 */
export function empty(): Portal {
  return new InternalPortal([], undefined, undefined)
}
