import { concreteWire } from "@effect/html/data/Wire/operations/_internal/InternalWire"

/**
 * @tsplus getter effect/html/Wire remove
 */
export function remove(
  self: Wire
): Effect<never, Wire.NoFirstChildException | Wire.NoLastChildException, ChildNode> {
  concreteWire(self)

  const firstChild = self.firstChild
  const lastChild = self.lastChild

  if (firstChild.isNone()) {
    return Effect.fail(new Wire.NoFirstChildException())
  }

  if (lastChild.isNone()) {
    return Effect.fail(new Wire.NoLastChildException())
  }

  return Effect.succeed(() => {
    const range = document.createRange()

    range.setStartAfter(firstChild.value)
    range.setEndAfter(lastChild.value)
    range.deleteContents()

    return firstChild.value
  })
}
