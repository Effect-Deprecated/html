/**
 * @tsplus static ets/WeakCache/Ops empty
 */
export function empty<K extends object, V>(): Effect.UIO<WeakCache<K, V>> {
  return WeakCache<Tuple<[K, V]>[]>()
}
