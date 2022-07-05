/**
 * @tsplus static effect/html/RenderContext/Ops isString
 */
export function isString() {
  return Effect.serviceWith(RenderContext.Tag, ({ context }) => context === "String")
}
