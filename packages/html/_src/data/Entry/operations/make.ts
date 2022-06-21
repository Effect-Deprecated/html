import { InternalEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static ets/Entry/Ops __call
 */
export function make(
  type: string,
  template: TemplateStringsArray,
  content: ParentNode,
  updates: ImmutableArray<(u: any) => Effect<never, any, void>>
): Entry {
  return new InternalEntry(type, template, content, updates, Maybe.none)
}
