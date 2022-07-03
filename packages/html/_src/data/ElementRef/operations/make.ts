import { ElementRefInternal } from "@effect/html/data/ElementRef/operations/_internal/ElementRefInternal"
import { AtomicReference } from "@tsplus/stdlib/data/AtomicReference"

/**
 * @tsplus static effect/html/ElementRef/Ops empty
 */
export function empty(): Effect.UIO<ElementRef> {
  return Effect.succeed(new ElementRefInternal(new AtomicReference(Maybe.none)))
}
