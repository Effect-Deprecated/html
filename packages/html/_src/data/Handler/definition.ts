export const HandlerSym = Symbol.for("@effect/html/data/Handler")
export type HandlerSym = typeof HandlerSym

/**
 * @tsplus type effect/html/Handler
 */
export interface Handler extends Placeholder.Generic<never> {
  readonly [HandlerSym]: HandlerSym
}

/**
 * @tsplus type effect/html/Handler/Ops
 */
export interface HandlerOps {
}
export const Handler: HandlerOps = {}
