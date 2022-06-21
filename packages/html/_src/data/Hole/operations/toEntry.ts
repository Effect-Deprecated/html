import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus static ets/Entry/Ops fromHole
 * @tsplus getter ets/Hole toEntry
 */
export function toEntry(
  self: Hole
) {
  concreteHole(self)

  return TemplateCache.getOrElse(self.template, self.toTemplate).flatMap((template) =>
    template.updates.map((updates) =>
      Entry(self.type, self.template, template.toDocumentFragment, updates.toImmutableArray)
    )
  )
}
