/**
 * @tsplus static ets/TemplateCache/Ops set
 */
export function setEffect<K extends TemplateStringsArray, R, E>(
  k: K,
  v: LazyArg<Effect<R, E, Template>>
): Effect<TemplateCache | R, E, Template> {
  return Effect.serviceWithEffect(TemplateCache.Tag, (_) => _.setEffect(k, v))
}
