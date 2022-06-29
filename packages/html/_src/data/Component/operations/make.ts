import { InternalComponent } from "@effect/html/data/Component/operations/_internal/InternalComponent"

/**
 * @tsplus static effect/html/Component/Ops __call
 */
export function make(
  stack: Ref.Synchronized<Array<Maybe<Component>>>,
  entry: Ref<Maybe<Entry>>,
  wire: Ref<Maybe<Wire | HTMLOrSVGElement>>
): Component {
  return new InternalComponent(stack, entry, wire)
}
