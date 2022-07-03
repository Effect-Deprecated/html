import { HandlerSym } from "@effect/html/data/Handler/definition"
import { _R, GenericSym } from "@effect/html/data/Placeholder/definition"

export class HandlerInternal implements Handler {
  readonly [HandlerSym]: HandlerSym = HandlerSym
  readonly [GenericSym]: GenericSym = GenericSym
  readonly [_R]!: (_: never) => never

  constructor(readonly eventListener: EventListenerOrEventListenerObject) {}
}

/**
 * @tsplus macro remove
 */
export function concreteHandler(
  _: Handler
): asserts _ is HandlerInternal {
  //
}
