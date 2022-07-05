/**
 * @tsplus getter effect/html/Interpolation toString
 */
export function toString(
  self: Interpolation
): string {
  const updates = UpdateCache.getOrElse(
    self.templateStringsArray,
    UpdateCache.set(self.templateStringsArray, self.updates)
  )

  return String(
    self.values.length ?
      self.toValues.map((value, i) => updates[i]!(value as never)).join("") :
      updates[0]!(undefined as never)
  )
}
