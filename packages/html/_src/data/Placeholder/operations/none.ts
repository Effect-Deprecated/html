import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export const NoneSym = Symbol.for("@effect/html/data/Placeholder/None")
export type NoneSym = typeof NoneSym

export class NoneInternal implements Placeholder.None {
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [NoneSym]: NoneSym = NoneSym
  readonly [_R]!: (_: never) => never;

  [Equals.sym](that: unknown): boolean {
    return that instanceof NoneInternal
  }
  [Hash.sym](): number {
    return Hash.string("effect/html/Placeholder/None")
  }
}

/**
 * Constructs `None`.
 *
 * @tsplus static effect/html/Placeholder/Ops none
 */
export const none: Placeholder.None = new NoneInternal()

/**
 * @tsplus static effect/html/Placeholder/Ops isNone
 */
export function isNone(u: unknown): u is Placeholder.None {
  return u instanceof NoneInternal
}
