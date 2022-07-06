export const GenericSym = Symbol.for("@effect/html/data/Placeholder/Generic")
export type GenericSym = typeof GenericSym

export const _R = Symbol.for("@effect/html/data/Placeholder/Generic/R")
export type _R = typeof _R

declare global {
  interface String extends Placeholder.Generic<never> {}
  interface Number extends Placeholder.Generic<never> {}
  interface Boolean extends Placeholder.Generic<never> {}
  interface Element extends Placeholder.Generic<never> {}
  interface Node extends Placeholder.Generic<never> {}
}

/**
 * @tsplus type effect/html/Placeholder
 */
export type Placeholder<R> =
  | Placeholder.Generic<R>
  | Effect<R, never, Placeholder.Value>

export declare namespace Placeholder {
  export interface Generic<R> {
    readonly [GenericSym]: GenericSym
    readonly [_R]: (_: never) => R
  }
  export type R<A> = [A] extends [Placeholder<infer R>] ? R : never
  export type Value =
    | string
    | number
    | boolean
    | Handler
    | Interpolation
    | None
    | Element
    | Wire
    | Node
    | ElementRef
    | Many
  export type Env<A extends Array<Placeholder<any>>> = { [k in keyof A]: Placeholder.R<A[k]> }[number]
}

/**
 * @tsplus type effect/html/Placeholder/Ops
 */
export interface PlaceholderOps {
}
export const Placeholder: PlaceholderOps = {}
