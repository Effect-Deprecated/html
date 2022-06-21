import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component removeStackEntry
 */
export function removeStackEntry(
  self: Component,
  index: number
): Effect.UIO<void> {
  concreteComponent(self)
  return self.stack.updateAndGetEffect((_) => Effect.succeed(() => _[index] = Maybe.none).as(_)).unit()
}
