import {
  InvalidElementException as InvalidElementExceptionInternal,
  MissingNodeException as MissingNodeExceptionInternal,
  NoNextSiblingException as NoNextSiblingExceptionInternal,
  NoParentNodeException as NoParentNodeExceptionInternal,
  NoTextNodeException as NoTextNodeExceptionInternal
} from "@effect/html/data/Template/errors"
import type {
  InvalidElementConstructor,
  MissingNodeConstructor,
  NoNextSiblingConstructor,
  NoParentNodeConstructor,
  NoTextNodeConstructor
} from "@effect/html/data/Template/errors"

export const TemplateSym = Symbol.for("@effect/html/data/Template")
export type TemplateSym = typeof TemplateSym

export declare namespace Template {
  export interface Node {
    type: "node" | "text" | "attr"
    path: Chunk<number>
    name: Maybe<string>
  }
  export interface NoNextSiblingException extends NoNextSiblingExceptionInternal {}
  export interface NoParentNodeException extends NoParentNodeExceptionInternal {}
  export interface NoTextNodeException extends NoTextNodeExceptionInternal {}
  export interface MissingNodeException extends MissingNodeExceptionInternal {}
  export interface InvalidElementException extends InvalidElementExceptionInternal {}
}

/**
 * @tsplus type ets/Template
 */
export interface Template {
  readonly [TemplateSym]: TemplateSym
}

/**
 * @tsplus type ets/Template/Ops
 */
export interface TemplateOps {
  $: TemplateAspects
  NoNextSiblingException: NoNextSiblingConstructor
  NoParentNodeException: NoParentNodeConstructor
  NoTextNodeException: NoTextNodeConstructor
  InvalidElementException: InvalidElementConstructor
  MissingNodeException: MissingNodeConstructor
}
export const Template: TemplateOps = {
  $: {},
  NoNextSiblingException: NoNextSiblingExceptionInternal,
  InvalidElementException: InvalidElementExceptionInternal,
  NoParentNodeException: NoParentNodeExceptionInternal,
  NoTextNodeException: NoTextNodeExceptionInternal,
  MissingNodeException: MissingNodeExceptionInternal
}

/**
 * @tsplus type ets/Template/Aspects
 */
export interface TemplateAspects {}
