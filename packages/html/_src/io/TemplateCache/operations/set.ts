/**
 * @tsplus static ets/TemplateCache/Ops set
 */
export function set<K extends TemplateStringsArray>(
  k: K,
  v: Template
): Effect<TemplateCache, never, Template> {
  return Effect.serviceWithEffect(TemplateCache.Tag, (_) => _.set(k, v))
}
