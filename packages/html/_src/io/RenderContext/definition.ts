export const RenderContextSym = Symbol.for("@effect/html/io/RenderContext")
export type RenderContextSym = typeof RenderContextSym

/**
 * @tsplus type effect/html/RenderContext
 */
export interface RenderContext {
  readonly _tag: "RenderContext"
  readonly context: "DOM" | "String"
}

/**
 * @tsplus type effect/html/RenderContext/Ops
 */
export interface RenderContextOps {
  $: RenderContextAspects
  Tag: Tag<RenderContext>
}
export const RenderContext: RenderContextOps = {
  $: {},
  Tag: Service.Tag()
}

/**
 * @tsplus type effect/html/RenderContext/Aspects
 */
export interface RenderContextAspects {}
