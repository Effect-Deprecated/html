import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter ets/Wire valueOf
 */
export function valueOf(
  self: Wire
): Effect.UIO<ParentNode> {
  concreteWire(self)

  return self.fragment.updateSomeAndGetEffect((fragment) => {
    if (fragment.childNodes.length !== self.nodes.length) {
      return Maybe.some(Effect.succeed(() => fragment.append(...self.nodes)).as(fragment))
    }

    return Maybe.none
  })
}
