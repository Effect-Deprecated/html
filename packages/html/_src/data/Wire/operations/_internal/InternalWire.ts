import { WireSym } from "@effect/html/data/Wire/definition"

export class InternalWire implements Wire {
  readonly ELEMENT_NODE = Wire.ELEMENT_NODE
  readonly nodeType = Wire.NODE_TYPE
  readonly [WireSym]: WireSym = WireSym

  constructor(
    readonly node: ParentNode,
    readonly nodes: Array<ChildNode>,
    readonly firstChild: ChildNode | null | undefined,
    readonly lastChild: ChildNode | null | undefined
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
