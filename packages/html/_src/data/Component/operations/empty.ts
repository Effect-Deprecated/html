import { InternalComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus static ets/Component/Ops empty
 */
export function empty(): Effect.UIO<Component> {
  return Effect.struct({
    stack: Ref.Synchronized.make(Array.empty<Maybe<Component>>()),
    entry: Ref.make(Maybe.none),
    wire: Ref.make(Maybe.none)
  }).map(({ entry, stack, wire }) => new InternalComponent(stack, entry, wire))
}
