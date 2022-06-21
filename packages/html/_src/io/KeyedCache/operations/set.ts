/**
 * @tsplus static ets/KeyedCache/Ops set
 */
export function set<K extends object>(
  k: K,
  v: KeyedCache.Entry
): Effect<KeyedCache, never, KeyedCache.Entry> {
  return Effect.serviceWithEffect(KeyedCache.Tag, (_) => _.set(k, v))
}
