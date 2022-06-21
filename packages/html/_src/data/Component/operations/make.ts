import { InternalComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus static ets/Component/Ops __call
 */
export function make(
  stack: SynchronizedRef<Array<Maybe<Component>>>,
  entry: Maybe<Entry>,
  wire: Maybe<Component>
): Component {
  return new InternalComponent(stack, entry, wire)
}
