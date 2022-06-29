import { InternalHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus static effect/html/Hole/Ops __call
 */
export function make(
  type: string,
  template: TemplateStringsArray,
  values: Many
): Hole {
  return new InternalHole(type, template, values)
}
