import { ElementRefInternal } from "@effect/html/data/ElementRef/operations/_internal/ElementRefInternal"

/**
 * @tsplus static effect/html/ElementRef/Ops empty
 */
export function empty(): Effect.UIO<ElementRef> {
  return Ref.make<Maybe<Element>>(Maybe.none).map((_) => new ElementRefInternal(_))
}
