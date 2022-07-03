import { InternalWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus static effect/html/Wire/Ops __call
 */
export function make(
  portal: ParentNode
): Wire {
  return new InternalWire(
    portal,
    [...portal.childNodes],
    portal.firstChild,
    portal.lastChild
  )
}
