import { NoneSym } from "@effect/html/data/None/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class NoneInternal implements None {
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [NoneSym]: NoneSym = NoneSym
  readonly [_R]!: (_: never) => never;

  [Equals.sym](that: unknown): boolean {
    return that instanceof NoneInternal
  }
  [Hash.sym](): number {
    return Hash.string("effect/html/None")
  }
}

/**
 * @tsplus static effect/html/None/Ops isNone
 */
export function isNone(u: unknown): u is None {
  return u instanceof NoneInternal
}
