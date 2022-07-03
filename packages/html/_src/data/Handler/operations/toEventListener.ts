import { concreteHandler } from "@effect/html/data/Handler/operations/_internal/HandlerInternal"

/**
 * @tsplus getter effect/html/Handler toEventListener
 */
export function toEventListener(self: Handler): EventListenerOrEventListenerObject {
  concreteHandler(self)
  return self.eventListener
}
