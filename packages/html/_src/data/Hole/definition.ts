export const HoleSym = Symbol.for("@effect/html/data/Hole")
export type HoleSym = typeof HoleSym

/**
 * @tsplus type effect/html/Hole
 */
export interface Hole extends Placeholder.Generic<never> {
  readonly [HoleSym]: HoleSym
}

/**
 * @tsplus static effect/html/Hole/Ops PREFIX
 */
export const PREFIX = "isµ"

/**
 * @tsplus type effect/html/Hole/Ops
 */
export interface HoleOps {
  $: HoleAspects
}
export const Hole: HoleOps = {
  $: {}
}

/**
 * @tsplus type effect/html/Hole/Aspects
 */
export interface HoleAspects {}
