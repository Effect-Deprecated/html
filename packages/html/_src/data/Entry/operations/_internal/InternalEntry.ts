import { EntrySym } from "@effect/html/data/Entry/definition"
import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

export class InternalEntry implements Entry {
  readonly [EntrySym]: EntrySym = EntrySym

  constructor(
    readonly type: string,
    readonly template: TemplateStringsArray,
    readonly content: ParentNode,
    readonly updates: ImmutableArray<(u: unknown) => Effect.UIO<void>>,
    readonly wire: Maybe<Wire>
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
