import { InternalWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus static effect/html/WeakCache/Ops from
 */
export function from<K extends object, V>(
  entries: Collection<Tuple<[K, V]>>
): WeakCache<K, V> {
  return new InternalWeakCache(new WeakMap(entries.map((_) => _.toNative)))
}
