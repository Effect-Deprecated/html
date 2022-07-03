import { TemplateSym } from "@effect/html/data/Template/definition"

/*
* A template is a class that holds the instantiated result of a template literal.
*/
export class InternalTemplate implements Template {
  readonly [TemplateSym]: TemplateSym = TemplateSym

  constructor(
    readonly content: DocumentFragment,
    readonly nodes: Array<Template.Node>
  ) {}
}

/**
 * @tsplus macro remove
 */
export function concreteTemplate(
  _: Template
): asserts _ is InternalTemplate {
  //
}
