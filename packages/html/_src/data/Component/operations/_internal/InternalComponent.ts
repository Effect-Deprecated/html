import { ComponentSym } from "@effect/html/data/Component/definition"

export class InternalComponent implements Component {
  readonly [ComponentSym]: ComponentSym = ComponentSym

  constructor(
    readonly stack: SynchronizedRef<Array<Maybe<Component>>>,
    readonly entry: Ref<Maybe<Entry>>,
    readonly wire: Ref<Maybe<Wire>>
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concreteComponent(
  _: Component
): asserts _ is InternalComponent {
  //
}
