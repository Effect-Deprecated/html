/**
 * @tsplus getter effect/html/Component fixed
 */
export function fixed(self: Component, type: "html" | "svg") {
  return <A extends Array<Placeholder<any>>>(
    template: TemplateStringsArray,
    placeholders: A
  ): Effect<Placeholder.Env<A>, never, Wire | ChildNode | ParentNode> =>
    Many.from(placeholders).flatMap((values) => self.unroll(Hole(type, template, values)))
}
