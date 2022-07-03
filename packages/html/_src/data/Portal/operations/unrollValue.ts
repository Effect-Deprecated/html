/**
 * @tsplus fluent effect/html/Portal unrollValue
 */
export function unrollValue(
  self: Portal,
  index: number,
  values: Array<Placeholder.Value | Portal.Values>
): void {
  const value = values[index]
  // each Interpolation gets unrolled and re-assigned as value
  // so that domdiff will deal with a node/wire, not with a hole
  if (Interpolation.isInterpolation(value)) {
    values[index] = self.getChild(index).unroll(
      value
    )
  } else if (Many.isMany(value)) {
    values[index] = self.getChild(index).unrollValues(value.toArray)
  } // arrays are recursively resolved so that each entry will contain
  // also a DOM node or a wire, hence it can be diffed if/when needed
  else if (Array.isArray(value)) {
    self.getChild(index).unrollValues(value)
  } // if the value is nothing special, the stack doesn't need to retain data
  // this is useful also to cleanup previously retained data, if the value
  // was a Interpolation, or an Array, but not anymore, i.e.:
  // const update = content => html`<div>${content}</div>`;
  // update(listOfItems); update(null); update(html`hole`)
  else {
    self.removeChild(index)
  }
}
