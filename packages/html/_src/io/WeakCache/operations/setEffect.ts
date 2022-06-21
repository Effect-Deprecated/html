import { concreteWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus fluent ets/WeakCache setEffect
 */
export function setEffect<K extends object, V, R, E>(self: WeakCache<K, V>, k: K, v: Effect<R, E, V>): Effect<R, E, V> {
  concreteWeakCache(self)
  return self.ref.updateAndGetEffect((map) => v.map((_) => map.set(k, _)).as(map)).map((_) => _.get(k)!)
}
