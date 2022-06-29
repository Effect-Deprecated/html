import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

/**
 * @tsplus static effect/html/Entry/Ops fromHole
 * @tsplus getter effect/html/Hole toEntry
 */
export function toEntry(
  self: Hole
): Effect.UIO<Entry> {
  concreteHole(self)

  return TemplateCache.getOrElseEffect(self.template, TemplateCache.set(self.template, self.toTemplate)).flatMap((
    template
  ) => {
    const fragment = template.toDocumentFragment

    return template.updates(fragment).flatMap((updates) =>
      Entry(self.type, self.template, fragment, updates.toImmutableArray)
    )
  }).orDie()
}
