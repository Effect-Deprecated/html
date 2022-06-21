import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus getter ets/Component entry
 */
export function entry<R, E>(
  self: Component
): Effect.UIO<Maybe<Entry>> {
  concreteComponent(self)
  return self.entry.get()
}
