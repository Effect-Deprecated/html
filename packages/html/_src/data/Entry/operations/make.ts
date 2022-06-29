import { InternalEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static effect/html/Entry/Ops __call
 */
export function make<R, E, A extends Event>(
  type: string,
  template: TemplateStringsArray,
  content: ParentNode,
  updates: ImmutableArray<Template.Update>
): Effect.UIO<Entry> {
  return Ref.Synchronized.make(Maybe.none).map((wire) => new InternalEntry(type, template, content, updates, wire))
}
