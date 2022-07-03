import { InterpolationSym } from "@effect/html/data/Interpolation/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class InternalInterpolation implements Interpolation {
  readonly [InterpolationSym]: InterpolationSym = InterpolationSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(
    readonly type: "html" | "svg",
    readonly template: TemplateStringsArray,
    readonly values: Array<Placeholder.Value> | Array<Portal.Values>
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concreteInterpolation(
  _: Interpolation
): asserts _ is InternalInterpolation {
  //
}
