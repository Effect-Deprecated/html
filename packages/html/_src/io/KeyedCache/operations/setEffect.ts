/**
 * @tsplus static ets/KeyedCache/Ops setEffect
 */
export function setEffect<K extends object, R, E>(
  k: K,
  v: LazyArg<Effect<R, E, KeyedCache.Entry>>
): Effect<KeyedCache | R, E, KeyedCache.Entry> {
  return Effect.serviceWithEffect(KeyedCache.Tag, (_) => _.setEffect(k, v))
}
