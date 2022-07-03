/**
 * @tsplus getter effect/html/Portal fixed
 */
export function fixed(
  self: Portal
) {
  return <A extends Array<Placeholder<any>>>(
    type: "html" | "svg",
    template: TemplateStringsArray,
    placeholders: A
  ): Effect<Placeholder.Env<A>, never, Wire | Node> =>
    Many.from(placeholders).map((values) => self.unroll(Interpolation(type, template, values)))
}
