/**
 * @tsplus static ets/ComponentCache/Ops setEffect
 */
export function setEffect<K extends Node, R, E>(
  k: K,
  v: LazyArg<Effect<R, E, Component>>
): Effect<ComponentCache | R, E, Component> {
  return Effect.serviceWithEffect(ComponentCache.Tag, (_) => _.setEffect(k, v))
}
