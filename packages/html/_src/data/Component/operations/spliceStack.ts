import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component spliceStack
 */
export function spliceStack(
  self: Component,
  index: number
): Effect.UIO<void> {
  concreteComponent(self)
  return self.stack.updateEffect((_) => Effect.succeed(() => _.splice(index)).as(_))
}
