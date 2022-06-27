import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static ets/Wire/Ops fromEntry
 * @tsplus getter ets/Entry toWire
 */
export function toWire(
  self: Entry
): Effect.UIO<Wire | ChildNode | ParentNode> {
  concreteEntry(self)

  return self.wire.updateSomeAndGetEffect((_) => {
    if (_.isNone()) {
      if (self.content.firstChild === self.content.lastChild) {
        if (self.content.lastChild != null) {
          return Maybe.some(Effect.succeed(self.content.lastChild).map(Maybe.some))
        }

        return Maybe.some(Effect.succeed(self.content).map(Maybe.some))
      }

      return Maybe.some(Wire(self.content).map(Maybe.some))
    }

    return Maybe.none
  }).flatMap((_) => Effect.fromMaybe(_)) as Effect.UIO<Wire | ChildNode | ParentNode>
}
