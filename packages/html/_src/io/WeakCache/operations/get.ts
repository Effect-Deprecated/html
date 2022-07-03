import { concreteWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus fluent effect/html/WeakCache get
 */
export function get<K extends object, V>(self: WeakCache<K, V>, k: K): V | undefined | null {
  concreteWeakCache(self)

  return self.map.get(k)
}
