import { concreteWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus fluent ets/WeakCache getOrElse
 */
export function getOrElse<K extends object, V, A>(self: WeakCache<K, V>, k: K, f: LazyArg<A>): Effect.UIO<V | A> {
  concreteWeakCache(self)
  return self.getOrElseEffect(k, Effect.succeed(f))
}
