import { ComponentCacheSym } from "@effect/html/io/ComponentCache/definition"

/**
 * @tsplus static ets/ComponentCache/Ops live
 */
export const live = Layer.fromEffect(
  ComponentCache.Tag,
  WeakCache.empty<Node, Component>().map((_) => new LiveComponentCache(_))
)

export class LiveComponentCache implements ComponentCache {
  readonly [ComponentCacheSym]: ComponentCacheSym = ComponentCacheSym

  constructor(readonly weakCache: WeakCache<Node, Component>) {
  }

  get<K extends Node>(k: K): Effect.UIO<Maybe<Component>> {
    return this.weakCache.get(k)
  }
  set<K extends Node>(
    k: K,
    v: Component
  ): Effect.UIO<Component> {
    return this.weakCache.set(k, v)
  }
  setEffect<K extends Node, R, E>(
    k: K,
    v: LazyArg<Effect<R, E, Component>>
  ): Effect<R, E, Component> {
    return this.weakCache.setEffect(k, v())
  }
}
