/**
 * @tsplus static ets/TemplateCache/Ops getOrElseEffect
 */
export function getOrElseEffect<K extends TemplateStringsArray, R, E, A>(
  k: K,
  fa: LazyArg<Effect<R, E, A>>
): Effect<TemplateCache | R, E, Template | A> {
  return Effect.serviceWithEffect(
    TemplateCache.Tag,
    (_) => _.get(k).flatMap((_) => _.isNone() ? fa() : Effect.succeed(_.value))
  )
}
