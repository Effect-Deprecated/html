export const EntrySym = Symbol.for("@effect/html/data/Entry")
export type EntrySym = typeof EntrySym

/**
 * @tsplus type ets/Entry
 */
export interface Entry {
  readonly [EntrySym]: EntrySym
}

/**
 * @tsplus type ets/Entry/Ops
 */
export interface EntryOps {
  $: EntryAspects
}
export const Entry: EntryOps = {
  $: {}
}

/**
 * @tsplus type ets/Entry/Aspects
 */
export interface EntryAspects {}
