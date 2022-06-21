/**
 * @tsplus static ets/TemplateCache/Ops getOrElse
 */
export function getOrElse<K extends TemplateStringsArray, A>(
  k: K,
  f: LazyArg<A>
): Effect<TemplateCache, never, Template | A> {
  return Effect.serviceWithEffect(
    TemplateCache.Tag,
    (_) => _.getOrElse(k, f)
  )
}
