/**
 * @tsplus static ets/KeyedCache/Ops get
 */
export function get<K extends object>(
  k: K
): Effect<KeyedCache, never, Maybe<KeyedCache.Entry>> {
  return Effect.serviceWithEffect(KeyedCache.Tag, (_) => _.get(k))
}
