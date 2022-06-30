import { ElementRefSym } from "@effect/html/data/ElementRef/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class ElementRefInternal implements ElementRef {
  readonly [ElementRefSym]: ElementRefSym = ElementRefSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(readonly ref: Ref<Maybe<Element>>) {}

  get current(): Effect.UIO<Maybe<Element>> {
    return this.ref.get()
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
