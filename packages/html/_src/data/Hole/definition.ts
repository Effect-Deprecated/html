export const HoleSym = Symbol.for("@effect/html/data/Hole")
export type HoleSym = typeof HoleSym

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
}
export const Hole: HoleOps = {
  $: {}
}

/**
 * @tsplus type ets/Hole/Aspects
 */
export interface HoleAspects {}
