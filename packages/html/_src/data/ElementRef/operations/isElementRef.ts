import { ElementRefInternal } from "@effect/html/data/ElementRef/operations/_internal/ElementRefInternal"

/**
 * @tsplus static effect/html/ElementRef/Ops isElementRef
 */
export function isElementRef(u: unknown): u is ElementRef {
  return u instanceof ElementRefInternal
}
