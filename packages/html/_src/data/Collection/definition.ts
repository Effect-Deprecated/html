export const CollectionSym = Symbol.for("@effect/html/data/Collection")
export type CollectionSym = typeof CollectionSym

/**
 * @tsplus type effect/html/Collection
 */
export interface Collection extends Placeholder.Generic<never> {
  readonly [CollectionSym]: CollectionSym

  get toChunk(): Chunk<Placeholder.Value>
}

/**
 * @tsplus type effect/html/Collection/Ops
 */
export interface CollectionOps {
}
export const Collection: CollectionOps = {}
