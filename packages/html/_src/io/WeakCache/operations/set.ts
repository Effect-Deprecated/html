/**
 * @tsplus fluent effect/html/WeakCache set
 */
export function set<K extends object, V>(self: WeakCache<K, V>, k: K, v: V): Effect.UIO<V> {
  return self.setEffect(k, Effect.succeed(v))
}
