import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component setEntryEffect
 */
export function setEntryEffect<R, E>(
  self: Component,
  fa: LazyArg<Effect<R, E, Entry>>
): Effect<R, E, Entry> {
  concreteComponent(self)
  return fa().flatMap((_) => self.entry.set(Maybe.some(_)).as(_))
}
