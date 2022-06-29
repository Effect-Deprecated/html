import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus getter effect/html/Component stackLength
 */
export function stackLength(
  self: Component
): Effect.UIO<number> {
  concreteComponent(self)
  return self.stack.get().map((_) => _.length)
}
