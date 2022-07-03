import { concreteWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus fluent effect/html/WeakCache set
 */
export function set<K extends object, V>(self: WeakCache<K, V>, k: K, v: V): V {
  concreteWeakCache(self)

  self.map.set(k, v)

  return v
}
