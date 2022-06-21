import { TemplateCacheSym } from "@effect/html/io/TemplateCache/definition"

/**
 * @tsplus static ets/TemplateCache/Ops live
 */
export const live = Layer.fromEffect(
  TemplateCache.Tag,
  WeakCache.empty<TemplateStringsArray, Template>().map((_) => new LiveTemplateCache(_))
)

export class LiveTemplateCache implements TemplateCache {
  readonly [TemplateCacheSym]: TemplateCacheSym = TemplateCacheSym

  constructor(readonly weakCache: WeakCache<TemplateStringsArray, Template>) {
  }

  get<K extends TemplateStringsArray>(k: K): Effect.UIO<Maybe<Template>> {
    return this.weakCache.get(k)
  }
  getOrElse<K extends TemplateStringsArray, A>(k: K, f: LazyArg<A>): Effect.UIO<A | Template> {
    return this.weakCache.getOrElse(k, f)
  }
  getOrElseEffect<K extends TemplateStringsArray, R, E, A>(
    k: K,
    fa: Effect<R, E, A>
  ): Effect<R, E, A | Template> {
    return this.weakCache.getOrElseEffect(k, fa)
  }
  set<K extends TemplateStringsArray>(
    k: K,
    v: Template
  ): Effect.UIO<Template> {
    return this.weakCache.set(k, v)
  }
  setEffect<K extends TemplateStringsArray, R, E>(
    k: K,
    v: LazyArg<Effect<R, E, Template>>
  ): Effect<R, E, Template> {
    return this.weakCache.setEffect(k, v())
  }
}
