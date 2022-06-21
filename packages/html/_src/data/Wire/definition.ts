import {
  NoFirstChildException as NoFirstChildInternal,
  NoLastChildException as NoLastChildInternal
} from "@effect/html/data/Wire/errors"
import type { NoFirstChildConstructor, NoLastChildConstructor } from "@effect/html/data/Wire/errors"

export const WireSym = Symbol.for("@effect/html/data/Wire")
export type WireSym = typeof WireSym

export declare namespace Wire {
  export interface NoFirstChildException extends NoFirstChildInternal {}
  export interface NoLastChildException extends NoLastChildInternal {}
}

/**
 * @tsplus type ets/Wire
 */
export interface Wire {
  readonly [WireSym]: WireSym
}

/**
 * @tsplus type ets/Wire/Ops
 */
export interface WireOps {
  $: WireAspects
  ELEMENT_NODE: 1
  NoFirstChildException: NoFirstChildConstructor
  NoLastChildException: NoLastChildConstructor
  NODE_TYPE: 111
}
export const Wire: WireOps = {
  $: {},
  ELEMENT_NODE: 1 as const,
  NODE_TYPE: 111 as const,
  NoFirstChildException: NoFirstChildInternal,
  NoLastChildException: NoLastChildInternal
}

/**
 * @tsplus type ets/Wire/Aspects
 */
export interface WireAspects {}
