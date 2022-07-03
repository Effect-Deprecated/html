import { PortalSym } from "@effect/html/data/Portal/definition"

export class InternalPortal implements Portal {
  readonly [PortalSym]: PortalSym = PortalSym

  constructor(
    // each portal keeps track of it's child portals
    readonly children: Array<Portal | null | undefined>,
    // if the template or type are different from the previous one
    // the entry gets re-created each time
    public entry?: Entry,
    // each rendered node represent some wired content and
    // this reference to the latest one. If different, the node
    // will be cleaned up and the new "wire" will be appended
    public wire?: Wire | Node
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concretePortal(
  _: Portal
): asserts _ is InternalPortal {
  //
}
