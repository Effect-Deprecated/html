export const ComponentSym = Symbol.for("@effect/html/data/Component")
export type ComponentSym = typeof ComponentSym

/**
 * @tsplus type ets/Component
 */
export interface Component {
  readonly [ComponentSym]: ComponentSym
}

/**
 * @tsplus type ets/Component/Ops
 */
export interface ComponentOps {
  $: ComponentAspects
}
export const Component: ComponentOps = {
  $: {}
}

/**
 * @tsplus type ets/Component/Aspects
 */
export interface ComponentAspects {}
