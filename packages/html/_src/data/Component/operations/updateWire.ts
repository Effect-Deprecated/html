import { concreteComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus fluent ets/Component updateWire
 */
export function updateWire(
  self: Component,
  wire: Wire | HTMLOrSVGElement
): Effect.UIO<Maybe<Wire | HTMLOrSVGElement>> {
  concreteComponent(self)

  return self.wire.getAndUpdateSome((oldValue) => {
    if (oldValue != Maybe.some(wire)) {
      return Maybe.some(Maybe.some(wire))
    }

    return Maybe.none
  })
}
