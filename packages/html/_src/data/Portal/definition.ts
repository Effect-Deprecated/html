export const PortalSym = Symbol.for("@effect/html/data/Portal")
export type PortalSym = typeof PortalSym

export declare namespace Portal {
  export type Value =
    | string
    | number
    | boolean
    | EventListener
    | EventListenerObject
    | Wire
    | Interpolation
    | Node
    | ElementRef
    | null
    | Array<
      | string
      | number
      | boolean
      | Wire
      | Node
      | null
      | undefined
    >
    | undefined
  export type Values =
    | Value
    | Array<Values>
}

/**
 * @tsplus type effect/html/Portal
 */
export interface Portal {
  readonly [PortalSym]: PortalSym
}

/**
 * @tsplus type effect/html/Portal/Ops
 */
export interface PortalOps {
  $: PortalAspects
}
export const Portal: PortalOps = {
  $: {}
}

/**
 * @tsplus type effect/html/Portal/Aspects
 */
export interface PortalAspects {}
