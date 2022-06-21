/**
 * @tsplus static ets/KeyedCache/Ops getOrElseEffect
 */
export function getOrElseEffect<K extends object, R, E, A>(
  k: K,
  fa: Effect<R, E, A>
): Effect<KeyedCache | R, E, KeyedCache.Entry | A> {
  return Effect.serviceWithEffect(
    KeyedCache.Tag,
    (_) => _.getOrElseEffect(k, fa)
  )
}
