export const ElementRefSym = Symbol.for("@effect/html/data/ElementRef")
export type ElementRefSym = typeof ElementRefSym

/**
 * @tsplus type effect/html/ElementRef
 */
export interface ElementRef extends Placeholder.Generic<never> {
  get current(): Effect.UIO<Maybe<Element>>
}

/**
 * @tsplus type effect/html/ElementRef/Ops
 */
export interface ElementRefOps {
}
export const ElementRef: ElementRefOps = {}
