import { InternalHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus static ets/Hole/Ops __call
 */
export function make(
  type: string,
  template: TemplateStringsArray,
  values: SynchronizedRef<Array<Hole | Array<unknown> | unknown>>
): Hole {
  return new InternalHole(type, template, values)
}
