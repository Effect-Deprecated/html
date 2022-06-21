export const KeyedCacheSym = Symbol.for("@effect/html/io/KeyedCache")
export type KeyedCacheSym = typeof KeyedCacheSym

export declare namespace KeyedCache {
  export interface Entry extends
    HashMap<
      unknown,
      (hole: Hole) => Effect<TemplateCache, Template.InvalidElementException | Template.MissingNodeException, Wire>
    >
  {}
}

/**
 * @tsplus type ets/KeyedCache
 */
export interface KeyedCache {
  readonly [KeyedCacheSym]: KeyedCacheSym
  get<K extends object>(k: K): Effect.UIO<Maybe<KeyedCache.Entry>>
  getOrElse<K extends object, A>(k: K, f: LazyArg<A>): Effect.UIO<KeyedCache.Entry | A>
  getOrElseEffect<K extends object, R, E, A>(k: K, fa: Effect<R, E, A>): Effect<R, E, KeyedCache.Entry | A>
  set<K extends object>(k: K, v: KeyedCache.Entry): Effect.UIO<KeyedCache.Entry>
  setEffect<K extends object, R, E>(
    k: K,
    v: LazyArg<Effect<R, E, KeyedCache.Entry>>
  ): Effect<R, E, KeyedCache.Entry>
}

/**
 * @tsplus type ets/KeyedCache/Ops
 */
export interface KeyedCacheOps {
  $: KeyedCacheAspects
  Tag: Tag<KeyedCache>
}
export const KeyedCache: KeyedCacheOps = {
  $: {},
  Tag: Service.Tag()
}

/**
 * @tsplus type ets/KeyedCache/Aspects
 */
export interface KeyedCacheAspects {}
