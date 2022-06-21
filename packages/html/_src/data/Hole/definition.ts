import {
  InvalidElementException as InvalidElementExceptionInternal,
  NoNextSiblingException as NoNextSiblingExceptionInternal,
  NoParentNodeException as NoParentNodeExceptionInternal,
  NoTextNodeException as NoTextNodeExceptionInternal
} from "@effect/html/data/Hole/errors"
import type {
  InvalidElementConstructor,
  NoNextSiblingConstructor,
  NoParentNodeConstructor,
  NoTextNodeConstructor
} from "@effect/html/data/Hole/errors"

export const HoleSym = Symbol.for("@effect/html/data/Hole")
export type HoleSym = typeof HoleSym

export declare namespace Hole {
  export interface NoNextSiblingException extends NoNextSiblingExceptionInternal {}
  export interface NoParentNodeException extends NoParentNodeExceptionInternal {}
  export interface NoTextNodeException extends NoTextNodeExceptionInternal {}
  export interface InvalidElementException extends InvalidElementExceptionInternal {}
}

/**
 * @tsplus type ets/Hole
 */
export interface Hole {
  readonly [HoleSym]: HoleSym
}

/**
 * @tsplus static ets/Hole/Ops PREFIX
 */
export const PREFIX = "isµ"

/**
 * @tsplus type ets/Hole/Ops
 */
export interface HoleOps {
  $: HoleAspects
  NoNextSiblingException: NoNextSiblingConstructor
  NoParentNodeException: NoParentNodeConstructor
  NoTextNodeException: NoTextNodeConstructor
  InvalidElementException: InvalidElementConstructor
}
export const Hole: HoleOps = {
  $: {},
  NoNextSiblingException: NoNextSiblingExceptionInternal,
  InvalidElementException: InvalidElementExceptionInternal,
  NoParentNodeException: NoParentNodeExceptionInternal,
  NoTextNodeException: NoTextNodeExceptionInternal
}

/**
 * @tsplus type ets/Hole/Aspects
 */
export interface HoleAspects {}
