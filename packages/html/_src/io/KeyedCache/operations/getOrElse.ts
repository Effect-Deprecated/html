/**
 * @tsplus static ets/KeyedCache/Ops getOrElse
 */
export function getOrElse<K extends object, A>(
  k: K,
  f: LazyArg<A>
): Effect<KeyedCache, never, KeyedCache.Entry | A> {
  return Effect.serviceWithEffect(
    KeyedCache.Tag,
    (_) => _.getOrElse(k, f)
  )
}
