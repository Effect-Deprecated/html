/**
 * @tsplus static ets/TemplateCache/Ops getOrElse
 */
export function getOrElse<K extends TemplateStringsArray, A>(
  k: K,
  f: LazyArg<A>
): Effect<TemplateCache, never, Template | A> {
  return TemplateCache.getOrElseEffect(k, Effect.succeed(f))
}
