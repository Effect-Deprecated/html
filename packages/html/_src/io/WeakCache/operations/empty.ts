/**
 * @tsplus static effect/html/WeakCache/Ops empty
 */
export function empty<K extends object, V>(): WeakCache<K, V> {
  return WeakCache<Tuple<[K, V]>[]>()
}
