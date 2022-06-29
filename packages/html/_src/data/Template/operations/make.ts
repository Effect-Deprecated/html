import { InternalTemplate } from "@effect/html/data/Template/operations/_internal/InternalTemplate"

/**
 * @tsplus static effect/html/Template/Ops __call
 */
export function make(
  content: DocumentFragment,
  nodes: Array<Template.Node>
): Template {
  return new InternalTemplate(content, nodes)
}
