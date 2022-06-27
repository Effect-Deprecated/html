import { EntrySym } from "@effect/html/data/Entry/definition"
import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

export class InternalEntry implements Entry {
  readonly [EntrySym]: EntrySym = EntrySym

  constructor(
    readonly type: string,
    readonly template: TemplateStringsArray,
    readonly content: ParentNode,
    readonly updates: ImmutableArray<(u: any) => Effect<never, any, void>>,
    readonly wire: Ref.Synchronized<Maybe<Wire | ChildNode | ParentNode>>
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
/**
 * @tsplus operator ets/Entry ==
 */
export function equalsHole(self: Entry, that: Hole): boolean {
  concreteEntry(self)
  concreteHole(that)
  return self.template === that.template && self.type === that.type
}
