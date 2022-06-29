/**
 * @tsplus static effect/html/ComponentCache/Ops getOrSet
 */
export function getOrSet<K extends Node>(
  k: K
): Effect.UIO<Component> {
  return ComponentCache.get(k).flatMap((_) =>
    _.isNone() ? ComponentCache.setEffect(k, Component.empty()) : Effect.succeed(_.value)
  )
}
