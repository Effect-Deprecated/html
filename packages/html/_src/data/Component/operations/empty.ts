import { InternalComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus static ets/Component/Ops empty
 */
export function empty(): Effect.UIO<Component> {
  return SynchronizedRef.make(Array.empty<Maybe<Component>>()).map((_) =>
    new InternalComponent(_, Maybe.none, Maybe.none)
  )
}
