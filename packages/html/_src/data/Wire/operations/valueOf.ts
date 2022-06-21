import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter ets/Wire valueOf
 */
export function valueOf(
  self: Wire
): Effect.UIO<ParentNode> {
  concreteWire(self)

  return self.fragment.get().flatMap((fragment) => {
    if (fragment.childNodes.length !== self.nodes.length) {
      return self.fragment.updateAndGetEffect((_) => Effect.succeed(() => _.append(...self.nodes)).as(_))
    }

    return Effect.succeed(fragment)
  })
}
