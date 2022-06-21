import { concreteHole } from "@effect/html/data/Hole/operations/_internal/InternalHole"

function createPath(node0: Node): Chunk<number> {
  const path = Chunk.builder<Maybe<number>>()
  let { parentNode } = node0
  let node = node0

  while (parentNode) {
    path.append(Chunk.from(parentNode.childNodes).findIndex((_) => _ === node))
    node = parentNode
    parentNode = node.parentNode
  }

  return path.build().collect(identity)
}

const textOnly = /^(?:textarea|script|style|title|plaintext|xmp)$/

/**
 * a template is instrumented to be able to retrieve where updates are needed.
 * Each unique template becomes a fragment, cloned once per each other
 * operation based on the same template, i.e. data => html`<p>${data}</p>`
 *
 * @tsplus getter ets/Hole toTemplate
 */
export function toTemplate(
  self: Hole
): Template {
  concreteHole(self)
  const text = self.instrument
  const content = self.toDocumentFragment
  // once instrumented and reproduced as fragment, it's crawled
  // to find out where each update is in the fragment tree
  const tw = document.createTreeWalker(content, 1 | 128)
  const nodes = Chunk.builder<Template.Node>()
  const length = self.template.length - 1
  let i = 0
  // updates are searched via unique names, linearly increased across the tree
  // <div isµ0="attr" isµ1="other"><!--isµ2--><style><!--isµ3--</style></div>
  let search = `${Hole.PREFIX}${i}`
  while (i < length) {
    const node = tw.nextNode()
    // if not all updates are bound but there's nothing else to crawl
    // it means that there is something wrong with the template.
    if (!node) {
      throw `bad template: ${text}`
    }
    // if the current node is a comment, and it contains isµX
    // it means the update should take care of any content
    if (node.nodeType === 8 && node instanceof CharacterData) {
      // The only comments to be considered are those
      // which content is exactly the same as the searched one.
      if (node.data === search) {
        nodes.append({ type: "node", path: createPath(node), name: Maybe.none })
        search = `${Hole.PREFIX}${++i}`
      }
    } else if (node instanceof Element) {
      // if the node is not a comment, loop through all its attributes
      // named isµX and relate attribute updates to this node and the
      // attribute name, retrieved through node.getAttribute("isµX")
      // the isµX attribute will be removed as irrelevant for the layout
      // let svg = -1;
      while (node.hasAttribute(search)) {
        nodes.append({
          type: "attr",
          path: createPath(node),
          name: Maybe.fromNullable(node.getAttribute(search))
        })
        node.removeAttribute(search)
        search = `${Hole.PREFIX}${++i}`
      }
      // if the node was a style, textarea, or others, check its content
      // and if it is <!--isµX--> then update tex-only this node
      if (
        textOnly.test(node.localName) &&
        node.textContent?.trim() === `<!--${search}-->`
      ) {
        node.textContent = ""
        nodes.append({ type: "text", path: createPath(node), name: Maybe.none })
        search = `${Hole.PREFIX}${++i}`
      }
    }
  }
  // once all nodes to update, or their attributes, are known, the content
  // will be cloned in the future to represent the template, and all updates
  // related to such content retrieved right away without needing to re-crawl
  // the exact same template, and its content, more than once.

  return Template(content, nodes.build().toList.toArray)
}
