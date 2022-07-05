export const NoneSym = Symbol.for("@effect/html/data/None")
export type NoneSym = typeof NoneSym

/**
 * @tsplus type effect/html/None
 */
export interface None extends Equals, Placeholder.Generic<never> {
  readonly [NoneSym]: NoneSym
}

/**
 * @tsplus type effect/html/None/Ops
 */
export interface NoneOps {
}
export const None: NoneOps = {}
