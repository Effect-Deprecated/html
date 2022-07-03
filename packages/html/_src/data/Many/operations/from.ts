import { Base } from "@effect/core/io/Effect/definition/base"
import { ManyInternal } from "@effect/html/data/Many/operations/_internal/ManyInternal"

/**
 * @tsplus static effect/html/Many/Ops from
 */
export function from<A extends Array<Placeholder<any>>>(
  placeholders: A
): Effect<Placeholder.Env<A>, never, Many> {
  return Effect.collectAll(placeholders.map((_) => {
    if (_ instanceof Base) {
      return _ as Effect<Placeholder.Env<A>, never, Placeholder.Value>
    }

    return Effect.succeedNow(_ as Placeholder.Value)
  })).map((_) =>
    new ManyInternal(
      _.toArray
    )
  )
}
