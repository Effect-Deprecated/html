export const TemplateCacheSym = Symbol.for("@effect/html/io/TemplateCache")
export type TemplateCacheSym = typeof TemplateCacheSym

/**
 * @tsplus type ets/TemplateCache
 */
export interface TemplateCache {
  readonly [TemplateCacheSym]: TemplateCacheSym
  get<K extends TemplateStringsArray>(k: K): Effect.UIO<Maybe<Template>>
  set<K extends TemplateStringsArray>(k: K, v: Template): Effect.UIO<Template>
  setEffect<K extends TemplateStringsArray, R, E>(
    k: K,
    v: LazyArg<Effect<R, E, Template>>
  ): Effect<R, E, Template>
}

/**
 * @tsplus type ets/TemplateCache/Ops
 */
export interface TemplateCacheOps {
  $: TemplateCacheAspects
  Tag: Tag<TemplateCache>
}
export const TemplateCache: TemplateCacheOps = {
  $: {},
  Tag: Service.Tag()
}

/**
 * @tsplus type ets/TemplateCache/Aspects
 */
export interface TemplateCacheAspects {}
