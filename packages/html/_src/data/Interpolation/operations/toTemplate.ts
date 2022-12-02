import { concreteInterpolation } from "@effect/html/data/Interpolation/operations/_internal/InternalInterpolation"

function createPath(node0: Node): Array<number> {
  const path: Array<number> = []
  let { parentNode } = node0
  let node = node0

  while (parentNode) {
    path.push(Array.prototype.indexOf.call(parentNode.childNodes, node))
    node = parentNode
    parentNode = node.parentNode
  }

  return path
}

const textOnly = /^(?:textarea|script|style|title|plaintext|xmp)$/

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
 * a template is instrumented to be able to retrieve where updates are needed.
 * Each unique template becomes a portal, cloned once per each other
 * operation based on the same template, i.e. data => html`<p>${data}</p>`
 *
 * @tsplus getter effect/html/Interpolation toTemplate
 */
export function toTemplate(
  self: Interpolation
): Template {
  concreteInterpolation(self)
  const text = self.instrument
  const content = self.isSVG ? toSVG(text) : toHTML(text)
  // once instrumented and reproduced as portal, it's crawled
  // to find out where each update is in the portal tree
  const tw = document.createTreeWalker(content, 1 | 128)
  const nodes: Array<Template.Node> = []
  const length = self.template.length - 1
  let i = 0
  // updates are searched via unique names, linearly increased across the tree
  // <div isµ0="attr" isµ1="other"><!--isµ2--><style><!--isµ3--</style></div>
  let search = `${Interpolation.PREFIX}${i}`
  while (i < length) {
    const node = tw.nextNode()
    // if not all updates are bound but there's nothing else to crawl
    // it means that there is something wrong with the template.
    if (!node) {
      throw new Interpolation.InvalidTemplateException(text)
    }
    // if the current node is a comment, and it contains isµX
    // it means the update should take care of any content
    if (node.nodeType === 8 && node instanceof CharacterData) {
      // The only comments to be considered are those
      // which content is exactly the same as the searched one.
      if (node.data === search) {
        nodes.push({ type: "node", path: createPath(node), name: undefined })
        search = `${Interpolation.PREFIX}${++i}`
      }
    } else if (node instanceof Element) {
      // if the node is not a comment, loop through all its attributes
      // named isµX and relate attribute updates to this node and the
      // attribute name, retrieved through node.getAttribute("isµX")
      // the isµX attribute will be removed as irrelevant for the layout
      // let svg = -1;
      while (node.hasAttribute(search)) {
        const name = node.getAttribute(search)
        if (name === "") {
          nodes.push({
            type: "dir",
            path: createPath(node),
            name: undefined
          })
        } else {
          nodes.push({
            type: "attr",
            path: createPath(node),
            name
          })
        }

        node.removeAttribute(search)
        search = `${Interpolation.PREFIX}${++i}`
      }
      // if the node was a style, textarea, or others, check its content
      // and if it is <!--isµX--> then update tex-only this node
      if (
        textOnly.test(node.localName) &&
        node.textContent?.trim() === `<!--${search}-->`
      ) {
        node.textContent = ""
        nodes.push({ type: "text", path: createPath(node), name: undefined })
        search = `${Interpolation.PREFIX}${++i}`
      }
    }
  }
  // once all nodes to update, or their attributes, are known, the content
  // will be cloned in the future to represent the template, and all updates
  // related to such content retrieved right away without needing to re-crawl
  // the exact same template, and its content, more than once.

  return Template(content, nodes)
}
