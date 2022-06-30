import { InternalWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"
import type { Collection } from "@tsplus/stdlib/collections/Collection"

/**
 * @tsplus static effect/html/WeakCache/Ops from
 */
export function from<K extends object, V>(
  entries: Collection<Tuple<[K, V]>>
): WeakCache<K, V> {
  return new InternalWeakCache(Ref.Synchronized.unsafeMake(new WeakMap(entries.map((_) => _.toNative))))
}
