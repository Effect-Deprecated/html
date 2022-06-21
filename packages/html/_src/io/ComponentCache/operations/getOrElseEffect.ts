/**
 * @tsplus static ets/ComponentCache/Ops getOrElseEffect
 */
export function getOrElseEffect<K extends Node, R, E, A>(
  k: K,
  fa: LazyArg<Effect<R, E, A>>
): Effect<ComponentCache | R, E, Component | A> {
  return Effect.serviceWithEffect(
    ComponentCache.Tag,
    (_) => _.get(k).flatMap((_) => _.isNone() ? fa() : Effect.succeed(_.value))
  )
}
