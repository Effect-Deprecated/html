/**
 * @tsplus static ets/ComponentCache/Ops get
 */
export function get<K extends Node>(
  k: K
): Effect<ComponentCache, never, Maybe<Component>> {
  return Effect.serviceWithEffect(ComponentCache.Tag, (_) => _.get(k))
}
