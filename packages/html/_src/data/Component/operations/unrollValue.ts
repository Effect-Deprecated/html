/**
 * @tsplus fluent effect/html/Component unrollValue
 */
export function unrollValue(
  self: Component,
  value: Placeholder.Value,
  index: number
): Effect.UIO<Component.Values> {
  // each Hole gets unrolled and re-assigned as value
  // so that domdiff will deal with a component/wire, not with a hole
  if (Hole.isHole(value)) {
    return self.getOrSetStackEntry(index).flatMap((_) => _.unroll(value))
  }

  // arrays are recursively resolved so that each component will contain
  // also a DOM component or a wire, hence it can be diffed if/when needed
  if (Many.isMany(value) || Collection.isCollection(value)) {
    return self.getOrSetStackEntry(index).flatMap((_) => _.unrollValues(value.toChunk))
  }

  // if the value is nothing special, the stack doesn't need to retain data
  // this is useful also to cleanup previously retained data, if the value
  // was a Hole, or an Array, but not anymore, i.e.:
  // const update = content => html`<div>${content}</div>`;
  // update(listOfItems); update(null); update(html`hole`)
  return self.removeStackEntry(index).as(() => value)
}
