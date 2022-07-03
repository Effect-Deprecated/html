import { InternalPortal } from "@effect/html/data/Portal/operations/_internal/InternalPortal"

/**
 * @tsplus static effect/html/Portal/Ops __call
 */
export function make(
  stack: Array<Portal | null | undefined>,
  entry?: Entry,
  wire?: Wire
): Portal {
  return new InternalPortal(stack, entry, wire)
}
