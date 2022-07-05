import { ElementRefSym } from "@effect/html/data/ElementRef/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"
import type { AtomicReference } from "@tsplus/stdlib/data/AtomicReference"

export class ElementRefInternal implements ElementRef {
  readonly [ElementRefSym]: ElementRefSym = ElementRefSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(readonly ref: AtomicReference<Maybe<Element>>) {}

  get current(): Effect<never, never, Maybe<Element>> {
    return Effect.succeedNow(this.ref.get)
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
