import { CollectionInternal } from "@effect/html/data/Collection/operations/_internal/CollectionInternal"

/**
 * @tsplus static effect/html/Collection/Ops isCollection
 */
export function isCollection(u: unknown): u is Collection {
  return u instanceof CollectionInternal
}
