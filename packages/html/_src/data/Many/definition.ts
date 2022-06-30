export const ManySym = Symbol.for("@effect/html/data/Many")
export type ManySym = typeof ManySym

/**
 * @tsplus type effect/html/Many
 */
export interface Many extends Placeholder.Generic<never> {
  readonly [ManySym]: ManySym

  get toChunk(): Chunk<Placeholder.Value>
}

/**
 * @tsplus type effect/html/Many/Ops
 */
export interface ManyOps {
}
export const Many: ManyOps = {}
