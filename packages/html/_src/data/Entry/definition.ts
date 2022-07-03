import type {
  MissingAttributeUpdateHandlerExceptionConstructor,
  MissingWireExceptionConstructor
} from "@effect/html/data/Entry/errors"
import {
  MissingAttributeUpdateHandlerException as MissingAttributeUpdateHandlerExceptionInternal,
  MissingWireException as MissingWireExceptionInternal
} from "@effect/html/data/Entry/errors"

export const EntrySym = Symbol.for("@effect/html/data/Entry")
export type EntrySym = typeof EntrySym

export declare namespace Entry {
  export interface MissingAttributeUpdateHandlerException extends MissingAttributeUpdateHandlerExceptionInternal {}
  export interface MissingWireException extends MissingWireExceptionInternal {}
}

/**
 *  An entry contains details, such as:
 *    * the template that is representing
 *    * the type of node it represents (html or svg)
 *    * the content portal with all nodes
 *    * the list of updates per each node (template interpolations)
 *    * the "wired" node or portal that will get updates
 *
 * @tsplus type effect/html/Entry
 */
export interface Entry {
  readonly [EntrySym]: EntrySym
}

/**
 * @tsplus type effect/html/Entry/Ops
 */
export interface EntryOps {
  $: EntryAspects
  MissingAttributeUpdateHandlerException: MissingAttributeUpdateHandlerExceptionConstructor
  MissingWireException: MissingWireExceptionConstructor
}
export const Entry: EntryOps = {
  $: {},
  MissingAttributeUpdateHandlerException: MissingAttributeUpdateHandlerExceptionInternal,
  MissingWireException: MissingWireExceptionInternal
}

/**
 * @tsplus type effect/html/Entry/Aspects
 */
export interface EntryAspects {}
