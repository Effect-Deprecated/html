import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component getOrSetStackEntry
 */
export function getOrSetStackEntry(
  self: Component,
  index: number
): Effect.UIO<Component> {
  concreteComponent(self)
  return self.stack.get().map((_) => {
    const component = _.at(index)

    if (component == undefined) {
      return Maybe.none
    }

    return component
  }).flatMap((component) =>
    component.isNone() ?
      Component.empty().flatMap((emptyComponent) =>
        self.stack.getAndUpdateEffect((_) => Effect.succeed(() => _[index] = Maybe.some(emptyComponent)).as(_)).as(
          emptyComponent
        )
      ) :
      Effect.succeed(component.value)
  )
}
