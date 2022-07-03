/**
 * the stack retains, per each interpolation value, the cache
 * related to each interpolation value, or null, if the render
 * was conditional and the value is not special (Array or Interpolation)
 *
 * @tsplus fluent effect/html/Portal unrollValues
 */
export function unrollValues(
  self: Portal,
  values: Array<Placeholder.Value> | Array<Portal.Values>
): Array<Portal.Values> {
  const { length } = values

  for (let i = 0; i < length; i++) {
    self.unrollValue(i, values)
  }

  self.spliceChildren(length)

  // this cast is required, because we are inline unrolling
  return values as Array<Portal.Values>
}
