import { KeyedCacheSym } from "@effect/html/io/KeyedCache/definition"

/**
 * @tsplus static ets/KeyedCache/Ops live
 */
export const live = Layer.fromEffect(
  KeyedCache.Tag,
  WeakCache.empty<object, KeyedCache.Entry>().map((_) => new LiveKeyedCache(_))
)

export class LiveKeyedCache implements KeyedCache {
  readonly [KeyedCacheSym]: KeyedCacheSym = KeyedCacheSym

  constructor(readonly weakCache: WeakCache<object, KeyedCache.Entry>) {
  }

  get<K extends object>(k: K): Effect.UIO<Maybe<KeyedCache.Entry>> {
    return this.weakCache.get(k)
  }
  getOrElse<K extends object, A>(k: K, f: LazyArg<A>): Effect.UIO<A | KeyedCache.Entry> {
    return this.weakCache.getOrElse(k, f)
  }
  getOrElseEffect<K extends object, R, E, A>(
    k: K,
    fa: Effect<R, E, A>
  ): Effect<R, E, A | KeyedCache.Entry> {
    return this.weakCache.getOrElseEffect(k, fa)
  }
  set<K extends object>(
    k: K,
    v: KeyedCache.Entry
  ): Effect.UIO<KeyedCache.Entry> {
    return this.weakCache.set(k, v)
  }
  setEffect<K extends object, R, E>(
    k: K,
    v: LazyArg<Effect<R, E, KeyedCache.Entry>>
  ): Effect<R, E, KeyedCache.Entry> {
    return this.weakCache.setEffect(k, v())
  }
}
