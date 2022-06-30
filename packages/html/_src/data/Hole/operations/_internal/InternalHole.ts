import { HoleSym } from "@effect/html/data/Hole/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class InternalHole implements Hole {
  readonly [HoleSym]: HoleSym = HoleSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(
    readonly type: string,
    readonly template: TemplateStringsArray,
    readonly values: Collection
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
