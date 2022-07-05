function toValue(value: Placeholder.Value | Portal.Values): Portal.Values {
  let newValue: Portal.Values

  if (Handler.isHandler(value)) {
    newValue = value.toEventListener
  } else if (None.isNone(value)) {
    newValue = null
  } else if (Many.isMany(value)) {
    newValue = value.toArray.map(toValue)
  } else {
    newValue = value
  }

  return newValue
}

/**
 * @tsplus getter effect/html/Interpolation toValues
 */
export function toValues(
  self: Interpolation
): Array<Portal.Values> {
  return self.values.map((value) => toValue(value))
}
