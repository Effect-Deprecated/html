import {
  InvalidElementException as InvalidElementExceptionInternal,
  MissingNameException as MissingNameExceptionInternal,
  MissingNodeException as MissingNodeExceptionInternal,
  NoNextSiblingException as NoNextSiblingExceptionInternal,
  NoParentNodeException as NoParentNodeExceptionInternal,
  NoTextNodeException as NoTextNodeExceptionInternal
} from "@effect/html/data/Template/errors"
import type {
  InvalidElementConstructor,
  MissingNameConstructor,
  MissingNodeConstructor,
  NoNextSiblingConstructor,
  NoParentNodeConstructor,
  NoTextNodeConstructor
} from "@effect/html/data/Template/errors"

export const TemplateSym = Symbol.for("@effect/html/data/Template")
export type TemplateSym = typeof TemplateSym

export declare namespace Template {
  export type Update =
    | ((value: number) => Effect.UIO<void>)
    | ((value: string) => Effect.UIO<void>)
    | ((value: ElementRef) => Effect.UIO<void>)
    | ((value: EventListenerOrEventListenerObject) => Effect.UIO<void>)
    | ((value: boolean) => Effect.UIO<void>)
    | ((value: Component.Values) => Effect.UIO<void>)
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
  export interface MissingNameException extends MissingNameExceptionInternal {}
}

/**
 * @tsplus type effect/html/Template
 */
export interface Template {
  readonly [TemplateSym]: TemplateSym
}

/**
 * @tsplus type effect/html/Template/Ops
 */
export interface TemplateOps {
  $: TemplateAspects
  NoNextSiblingException: NoNextSiblingConstructor
  NoParentNodeException: NoParentNodeConstructor
  NoTextNodeException: NoTextNodeConstructor
  InvalidElementException: InvalidElementConstructor
  MissingNodeException: MissingNameConstructor
  MissingNameException: MissingNodeConstructor
}
export const Template: TemplateOps = {
  $: {},
  NoNextSiblingException: NoNextSiblingExceptionInternal,
  InvalidElementException: InvalidElementExceptionInternal,
  NoParentNodeException: NoParentNodeExceptionInternal,
  NoTextNodeException: NoTextNodeExceptionInternal,
  MissingNameException: MissingNameExceptionInternal,
  MissingNodeException: MissingNodeExceptionInternal
}

/**
 * @tsplus type effect/html/Template/Aspects
 */
export interface TemplateAspects {}
