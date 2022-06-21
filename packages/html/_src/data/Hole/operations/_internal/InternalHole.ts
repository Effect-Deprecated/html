import { HoleSym } from "@effect/html/data/Hole/definition"

export class InternalHole implements Hole {
  readonly [HoleSym]: HoleSym = HoleSym

  constructor(
    readonly type: string,
    readonly template: TemplateStringsArray,
    readonly values: SynchronizedRef<Array<Hole | Array<unknown> | unknown>>
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concreteHole(
  _: Hole
): asserts _ is InternalHole {
  //
}
