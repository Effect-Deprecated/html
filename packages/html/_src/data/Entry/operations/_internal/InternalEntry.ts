import { EntrySym } from "@effect/html/data/Entry/definition"

export class InternalEntry implements Entry {
  readonly [EntrySym]: EntrySym = EntrySym

  constructor(
    // the type of node it represents (html or svg)
    readonly type: "html" | "svg",
    // the template that is representing
    readonly template: TemplateStringsArray,
    // the content document portal with all nodes
    readonly content: DocumentFragment,
    // the list of updates per each node (template interpolations)
    readonly updates: Array<Template.Update>,
    // the "wired" node or wire that will get updates
    public wire: Wire | ChildNode | ParentNode | undefined | null
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concreteEntry(
  _: Entry
): asserts _ is InternalEntry {
  //
}
