import { HandlerInternal } from "@effect/html/data/Handler/operations/_internal/HandlerInternal"

/**
 * @tsplus static effect/html/Handler/Ops isHandler
 */
export function isHandler(u: unknown): u is Handler {
  return u instanceof HandlerInternal
}
