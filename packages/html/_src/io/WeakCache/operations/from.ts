import { InternalWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus static ets/WeakCache/Ops from
 */
export function from<K extends object, V>(
  entries: Collection<Tuple<[K, V]>>
): Effect.UIO<WeakCache<K, V>> {
  return SynchronizedRef.make(new WeakMap(entries.map((_) => _.toNative))).map((_) => new InternalWeakCache(_))
}
