import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent effect/html/Component setEntryEffect
 */
export function setEntryEffect(
  self: Component,
  fa: LazyArg<Effect.UIO<Entry>>
): Effect.UIO<Entry> {
  concreteComponent(self)
  return fa().flatMap((_) => self.entry.set(Maybe.some(_)).as(_))
}
