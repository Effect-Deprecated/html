/**
 * @tsplus static ets/ComponentCache/Ops getOrElse
 */
export function getOrElse<K extends Node, R, E, A>(
  k: K,
  f: LazyArg<A>
): Effect<ComponentCache | R, E, Component | A> {
  return Effect.serviceWithEffect(
    ComponentCache.Tag,
    (_) => _.getOrElse(k, f)
  )
}
