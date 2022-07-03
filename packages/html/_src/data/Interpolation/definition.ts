import type { InvalidTemplateExceptionConstructor } from "@effect/html/data/Interpolation/errors"
import { InvalidTemplateException as InvalidTemplateExceptionInternal } from "@effect/html/data/Interpolation/errors"

export const InterpolationSym = Symbol.for("@effect/html/data/Interpolation")
export type InterpolationSym = typeof InterpolationSym

export declare namespace Interpolation {
  export interface InvalidTemplateException extends InvalidTemplateExceptionInternal {}
}

/**
 * @tsplus type effect/html/Interpolation
 */
export interface Interpolation extends Placeholder.Generic<never> {
  readonly [InterpolationSym]: InterpolationSym
}

/**
 * @tsplus static effect/html/Interpolation/Ops PREFIX
 */
export const PREFIX = "isµ"

/**
 * @tsplus type effect/html/Interpolation/Ops
 */
export interface InterpolationOps {
  $: InterpolationAspects
  InvalidTemplateException: InvalidTemplateExceptionConstructor
}
export const Interpolation: InterpolationOps = {
  $: {},
  InvalidTemplateException: InvalidTemplateExceptionInternal
}

/**
 * @tsplus type effect/html/Interpolation/Aspects
 */
export interface InterpolationAspects {}
