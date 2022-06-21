import { InternalEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static ets/Entry/Ops __call
 */
export function make(
  type: string,
  template: TemplateStringsArray,
  content: ParentNode,
  updates: ImmutableArray<(u: unknown) => Effect.UIO<void>>,
  wire: Maybe<Wire>
): Entry {
  return new InternalEntry(type, template, content, updates, wire)
}
