import { concreteWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus fluent ets/WeakCache get
 */
export function get<K extends object, V>(self: WeakCache<K, V>, k: K): Effect.UIO<Maybe<V>> {
  concreteWeakCache(self)
  return self.ref.get().map((_) => _.get(k)).map(Maybe.fromNullable)
}
