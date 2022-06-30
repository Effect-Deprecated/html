import { CollectionSym } from "@effect/html/data/Collection/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class CollectionInternal implements Collection {
  readonly [CollectionSym]: CollectionSym = CollectionSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(readonly placeholders: Chunk<Placeholder.Value>) {}

  get toChunk(): Chunk<Placeholder.Value> {
    return this.placeholders
  }
}

/**
 * @tsplus macro remove
 */
export function concreteCollection(
  _: Collection
): asserts _ is CollectionInternal {
  //
}
