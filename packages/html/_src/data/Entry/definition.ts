export const EntrySym = Symbol.for("@effect/html/data/Entry")
export type EntrySym = typeof EntrySym

/**
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
}
export const Entry: EntryOps = {
  $: {}
}

/**
 * @tsplus type effect/html/Entry/Aspects
 */
export interface EntryAspects {}
