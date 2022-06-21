/**
 * @tsplus static ets/ComponentCache/Ops getOrSet
 */
export function getOrSet<K extends Node>(
  k: K
): Effect<ComponentCache, never, Component> {
  return Effect.serviceWithEffect(
    ComponentCache.Tag,
    (_) =>
      _.get(k).flatMap((_) => _.isNone() ? ComponentCache.setEffect(k, Component.empty()) : Effect.succeed(_.value))
  )
}
