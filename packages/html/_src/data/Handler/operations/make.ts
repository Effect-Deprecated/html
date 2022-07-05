import { HandlerInternal } from "@effect/html/data/Handler/operations/_internal/HandlerInternal"

/**
 * Constructs `Handler`.
 *
 * @tsplus static effect/html/Handler/Ops __call
 */
export function make(
  eventListener: EventListenerOrEventListenerObject | string
): Effect.UIO<Handler> {
  return Effect.succeedNow(new HandlerInternal(eventListener))
}
