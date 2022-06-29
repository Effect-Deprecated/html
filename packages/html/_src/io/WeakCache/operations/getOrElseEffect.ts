import { concreteWeakCache } from "@effect/html/io/WeakCache/operations/_internal/InternalWeakCache"

/**
 * @tsplus fluent effect/html/WeakCache getOrElseEffect
 */
export function getOrElseEffect<K extends object, V, R, E, A>(
  self: WeakCache<K, V>,
  k: K,
  fa: Effect<R, E, A>
): Effect<R, E, V | A> {
  concreteWeakCache(self)
  return self.ref.get().map((_) => _.get(k)).map(Maybe.fromNullable).flatMap((_) =>
    _.isNone() ? fa : Effect.succeed(_.value)
  )
}
