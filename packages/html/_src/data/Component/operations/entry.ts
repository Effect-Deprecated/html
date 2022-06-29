import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus getter effect/html/Component entry
 */
export function entry<R, E>(
  self: Component
): Effect.UIO<Maybe<Entry>> {
  concreteComponent(self)
  return self.entry.get()
}
