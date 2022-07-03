import type { NoneSym } from "@effect/html/data/Placeholder/operations/none"

export const GenericSym = Symbol.for("@effect/html/data/Placeholder/Generic")
export type GenericSym = typeof GenericSym

export const _R = Symbol.for("@effect/html/data/Placeholder/Generic/R")
export type _R = typeof _R

declare global {
  interface String extends Placeholder.Generic<never> {}
  interface Number extends Placeholder.Generic<never> {}
  interface Boolean extends Placeholder.Generic<never> {}
}

/**
 * @tsplus type effect/html/Placeholder
 */
export type Placeholder<R> =
  | Placeholder.Generic<never>
  | Effect<R, never, Placeholder.Value>

export declare namespace Placeholder {
  export interface Generic<R> {
    readonly [GenericSym]: GenericSym
    readonly [_R]: (_: never) => R
  }
  export interface None extends Equals, Placeholder.Generic<never> {
    readonly [NoneSym]: NoneSym
  }
  export type R<A> = [A] extends [Placeholder<infer R>] ? R : never
  export type Value =
    | string
    | number
    | boolean
    | Handler
    | Interpolation
    | Placeholder.None
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
