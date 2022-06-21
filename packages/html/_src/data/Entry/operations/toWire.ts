import { concreteEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static ets/Wire/Ops fromEntry
 * @tsplus getter ets/Entry toWire
 */
export function toWire(
  self: Entry
): Effect.UIO<Wire> {
  concreteEntry(self)
  return self.wire.isNone() ? Wire(self.content) : Effect.succeed(self.wire.value)
}
