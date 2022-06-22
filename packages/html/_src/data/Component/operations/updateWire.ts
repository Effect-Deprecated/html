import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component updateWire
 */
export function updateWire(
  self: Component,
  wire: Wire | HTMLOrSVGElement | ParentNode | ChildNode
): Effect.UIO<Maybe<Wire | HTMLOrSVGElement | ParentNode | ChildNode>> {
  concreteComponent(self)

  return self.wire.updateSomeAndGet((oldValue) => {
    if (oldValue != Maybe.some(wire)) {
      return Maybe.some(Maybe.some(wire))
    }

    return Maybe.none
  })
}
