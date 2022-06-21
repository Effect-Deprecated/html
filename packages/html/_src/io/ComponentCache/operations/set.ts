/**
 * @tsplus static ets/ComponentCache/Ops set
 */
export function set<K extends Node>(
  k: K,
  v: Component
): Effect<ComponentCache, never, Component> {
  return Effect.serviceWithEffect(ComponentCache.Tag, (_) => _.set(k, v))
}
