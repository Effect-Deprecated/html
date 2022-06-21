export class NoNextSiblingException {}
export class NoParentNodeException {}
export class NoTextNodeException {}
export class InvalidElementException {}
export class MissingNodeException {}

export type NoParentNodeConstructor = typeof NoParentNodeException
export type MissingNodeConstructor = typeof MissingNodeException
export type InvalidElementConstructor = typeof InvalidElementException
export type NoTextNodeConstructor = typeof NoTextNodeException
export type NoNextSiblingConstructor = typeof NoNextSiblingException
