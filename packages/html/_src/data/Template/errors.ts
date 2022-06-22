export class NoNextSiblingException {}
export class NoParentNodeException {}
export class NoTextNodeException {}
export class InvalidElementException {}
export class MissingNodeException {}
export class MissingNameException {}

export type NoParentNodeConstructor = typeof NoParentNodeException
export type MissingNameConstructor = typeof MissingNameException
export type MissingNodeConstructor = typeof MissingNodeException
export type InvalidElementConstructor = typeof InvalidElementException
export type NoTextNodeConstructor = typeof NoTextNodeException
export type NoNextSiblingConstructor = typeof NoNextSiblingException
