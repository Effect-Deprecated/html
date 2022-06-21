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
