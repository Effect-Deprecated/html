function toHTML(html: string): DocumentFragment {
  const template = document.createElement("template")
  template.innerHTML = html
  return template.content
}

function toSVG(svg: string): DocumentFragment {
  const xml = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  xml.innerHTML = svg

  const content = document.createDocumentFragment()
  content.append(...xml.childNodes)

  return content
}

/**
 * @tsplus getter effect/html/Interpolation toDocumentFragment
 */
export function toDocumentFragment(
  self: Interpolation
): DocumentFragment {
  return self.isSVG ? toSVG(self.instrument) : toHTML(self.instrument)
}
