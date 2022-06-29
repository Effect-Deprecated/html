export const ComponentSym = Symbol.for("@effect/html/data/Component")
export type ComponentSym = typeof ComponentSym

export declare namespace Component {
  export type Value =
    | string
    | number
    | boolean
    | EventListener
    | EventListenerObject
    | Wire
    | Node
    | Component
    | Placeholder.None
  export type Values =
    | Value
    | Chunk<
      | string
      | number
      | boolean
      | Wire
      | Node
      | Placeholder.None
    >
    | Chunk<Values>
}

/**
 * @tsplus type effect/html/Component
 */
export interface Component {
  readonly [ComponentSym]: ComponentSym
}

/**
 * @tsplus type effect/html/Component/Ops
 */
export interface ComponentOps {
  $: ComponentAspects
}
export const Component: ComponentOps = {
  $: {}
}

/**
 * @tsplus type effect/html/Component/Aspects
 */
export interface ComponentAspects {}
