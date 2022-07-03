/**
 * @tsplus static effect/html/RenderContext/Ops __call
 */
export const make = (context: "DOM" | "String") =>
  Layer.fromValue(
    RenderContext.Tag,
    {
      _tag: "RenderContext",
      context
    }
  )
