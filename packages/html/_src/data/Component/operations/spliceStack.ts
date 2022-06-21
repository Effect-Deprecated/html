import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component spliceStack
 */
export function spliceStack(
  self: Component,
  index: number
): Effect.UIO<void> {
  concreteComponent(self)
  return self.stack.getAndUpdateEffect((_) => Effect.succeed(() => _.splice(index)).as(_)).unit()
}
