export const WeakCacheSym = Symbol.for("@effect/html/io/WeakCache")
export type WeakCacheSym = typeof WeakCacheSym

export const _K = Symbol.for("@effect/html/io/WeakCache/K")
export type _K = typeof _K

export const _V = Symbol.for("@effect/html/io/WeakCache/V")
export type _V = typeof _V

/**
 * @tsplus type ets/WeakCache
 */
export interface WeakCache<K extends object, V> {
  readonly [WeakCacheSym]: WeakCacheSym
  readonly [_K]: () => K
  readonly [_V]: () => V
}

/**
 * @tsplus type ets/WeakCache/Ops
 */
export interface WeakCacheOps {
  $: WeakCacheAspects
}
export const WeakCache: WeakCacheOps = {
  $: {}
}

/**
 * @tsplus type ets/WeakCache/Aspects
 */
export interface WeakCacheAspects {}
