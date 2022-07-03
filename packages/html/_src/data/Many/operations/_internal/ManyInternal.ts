import { ManySym } from "@effect/html/data/Many/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class ManyInternal implements Many {
  readonly [ManySym]: ManySym = ManySym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(readonly placeholders: Array<Placeholder.Value>) {}

  get toArray(): Array<Placeholder.Value> {
    return this.placeholders
  }
}

/**
 * @tsplus macro remove
 */
export function concreteMany(
  _: Many
): asserts _ is ManyInternal {
  //
}
