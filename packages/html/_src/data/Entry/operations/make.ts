import { InternalEntry } from "@effect/html/data/Entry/operations/_internal/InternalEntry"

/**
 * @tsplus static effect/html/Entry/Ops __call
 */
export function make(
  type: "html" | "svg",
  template: TemplateStringsArray,
  content: DocumentFragment,
  updates: Array<Template.Update>
): Entry {
  return new InternalEntry(type, template, content, updates, undefined)
}
