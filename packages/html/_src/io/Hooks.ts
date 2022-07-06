const afterRenderRef = FiberRef.unsafeMake(Maybe.emptyOf<Ref<Chunk<Effect.UIO<void>>>>())

export function withHooks<R, R1, E, E1, A, B>(
  fa: LazyArg<Effect<R, E, A>>,
  f: (a: A) => Effect<R1, E1, B>
): Effect<R | R1, E | E1, B> {
  return Do(($) => {
    const ref = $(Ref.make(Chunk.empty<Effect.UIO<void>>()))
    const result = $(afterRenderRef.locally(Maybe.some(ref))(fa()).flatMap(f))

    $(
      ref.get().flatMap((hooks) => Effect.collectAllDiscard(hooks))
    )

    return result
  })
}

export function afterRender<R, A>(effect: LazyArg<Effect<R, never, A>>): Effect<R, never, void> {
  return afterRenderRef
    .get()
    .flatMap((ref) =>
      ref.fold(
        Effect.unit,
        (ref) =>
          Effect.environment<R>()
            .flatMap((env) =>
              ref.update((c) =>
                c.append(
                  Effect.suspendSucceed(effect).provideEnvironment(env)
                )
              )
            )
      )
    )
}
