import {
  InvalidElementException as InvalidElementExceptionInternal,
  MissingAttributeNameException as MissingAttributeNameExceptionInternal,
  MissingNodeException as MissingNodeExceptionInternal,
  NoNextSiblingException as NoNextSiblingExceptionInternal,
  NoParentNodeException as NoParentNodeExceptionInternal,
  NoTextNodeException as NoTextNodeExceptionInternal
} from "@effect/html/data/Template/errors"
import type {
  InvalidElementConstructor,
  MissingAttributeNameConstructor,
  MissingNodeConstructor,
  NoNextSiblingConstructor,
  NoParentNodeConstructor,
  NoTextNodeConstructor
} from "@effect/html/data/Template/errors"

export const TemplateSym = Symbol.for("@effect/html/data/Template")
export type TemplateSym = typeof TemplateSym

export declare namespace Template {
  export type Update =
    | ((newValue: number) => void)
    | ((newValue: string) => void)
    | ((newValue: ElementRef) => void)
    | ((newValue: undefined | null) => void)
    | ((newValue: EventListenerOrEventListenerObject) => void)
    | ((newValue: boolean) => void)
    | ((newValue: Portal.Values) => void)
  export interface Node {
    type: "node" | "text" | "attr" | "dir"
    path: Array<number>
    name: string | null | undefined
  }
  export interface NoNextSiblingException extends NoNextSiblingExceptionInternal {}
  export interface NoParentNodeException extends NoParentNodeExceptionInternal {}
  export interface NoTextNodeException extends NoTextNodeExceptionInternal {}
  export interface MissingNodeException extends MissingNodeExceptionInternal {}
  export interface InvalidElementException extends InvalidElementExceptionInternal {}
  export interface MissingAttributeNameException extends MissingAttributeNameExceptionInternal {}
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
  MissingNodeException: MissingNodeConstructor
  MissingAttributeNameException: MissingAttributeNameConstructor
}
export const Template: TemplateOps = {
  $: {},
  NoNextSiblingException: NoNextSiblingExceptionInternal,
  InvalidElementException: InvalidElementExceptionInternal,
  NoParentNodeException: NoParentNodeExceptionInternal,
  NoTextNodeException: NoTextNodeExceptionInternal,
  MissingAttributeNameException: MissingAttributeNameExceptionInternal,
  MissingNodeException: MissingNodeExceptionInternal
}

/**
 * @tsplus type effect/html/Template/Aspects
 */
export interface TemplateAspects {}
