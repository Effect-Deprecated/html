import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

/**
 * @tsplus static effect/html/Entry/Ops fromInterpolation
 * @tsplus getter effect/html/Interpolation toEntry
 */
export function toEntry(
  self: Interpolation
): Entry {
  concreteInterpolation(self)

  // if a template is unknown, perform the previous mapping, otherwise grab
  // its details such as the fragment with all nodes, and updates info.
  const template = TemplateCache.getOrElse(self.template, TemplateCache.set(self.template, self.toTemplate))
  const fragment = template.toDocumentFragment

  return Entry(self.type, self.template, fragment, template.updates(fragment))
}
