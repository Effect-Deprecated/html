import { WireSym } from "@effect/html/data/Wire/definition"

export class InternalWire implements Wire {
  readonly ELEMENT_NODE = Wire.ELEMENT_NODE
  readonly nodeType = Wire.NODE_TYPE
  readonly [WireSym]: WireSym = WireSym

  constructor(
    readonly fragment: SynchronizedRef<ParentNode>,
    readonly nodes: Chunk<ChildNode>,
    readonly firstChild: Maybe<ChildNode>,
    readonly lastChild: Maybe<ChildNode>
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concreteWire(
  _: Wire
): asserts _ is InternalWire {
  //
}
