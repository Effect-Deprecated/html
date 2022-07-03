import { ElementRefSym } from "@effect/html/data/ElementRef/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"
import type { AtomicReference } from "@tsplus/stdlib/data/AtomicReference"

export class ElementRefInternal implements ElementRef {
  readonly [ElementRefSym]: ElementRefSym = ElementRefSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(readonly ref: AtomicReference<Maybe<Element>>) {}

  get current(): Effect<never, never, Element> {
    // use proper error class (mapError)
    return Effect.fromMaybe(this.ref.get).orDie()
  }
}

/**
 * @tsplus macro remove
 */
export function concreteElementRef(
  _: ElementRef
): asserts _ is ElementRefInternal {
  //
}
