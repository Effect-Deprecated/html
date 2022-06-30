import { Base } from "@effect/core/io/Effect/definition/base"
import { CollectionInternal } from "@effect/html/data/Collection/operations/_internal/CollectionInternal"

/**
 * Constructs `Collection`.
 *
 * @tsplus static effect/html/Collection/Ops __call
 */
export function from<A extends Array<Placeholder<any>>>(
  placeholders: A
): Effect<Placeholder.Env<A>, never, Collection> {
  return Chunk.from(placeholders).mapEffect((_) => {
    if (_ instanceof Base) {
      return _ as Effect<Placeholder.Env<A>, never, Placeholder.Value>
    }

    return Effect.succeedNow(_ as Placeholder.Value)
  }).map((_) =>
    new CollectionInternal(
      _
    )
  )
}
