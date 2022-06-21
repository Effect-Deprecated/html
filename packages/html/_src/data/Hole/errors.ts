export class NoNextSiblingException {}
export class NoParentNodeException {}
export class NoTextNodeException {}
export class InvalidElementException {}

export type NoParentNodeConstructor = typeof NoParentNodeException
export type InvalidElementConstructor = typeof InvalidElementException
export type NoTextNodeConstructor = typeof NoTextNodeException
export type NoNextSiblingConstructor = typeof NoNextSiblingException
