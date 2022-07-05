/**
 * @tsplus static effect/html/RenderContext/Ops isDOM
 */
export function isDOM() {
  return Effect.serviceWith(RenderContext.Tag, ({ context }) => context === "DOM")
}
