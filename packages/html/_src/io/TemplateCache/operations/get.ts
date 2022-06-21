/**
 * @tsplus static ets/TemplateCache/Ops get
 */
export function get<K extends TemplateStringsArray>(
  k: K
): Effect<TemplateCache, never, Maybe<Template>> {
  return Effect.serviceWithEffect(TemplateCache.Tag, (_) => _.get(k))
}
