export class NoNextSiblingException {}
export class NoParentNodeException {}
export class NoTextNodeException {}
export class InvalidElementException {}
export class MissingNodeException {}
export class MissingAttributeNameException {}

export type NoParentNodeConstructor = typeof NoParentNodeException
export type MissingAttributeNameConstructor = typeof MissingAttributeNameException
export type MissingNodeConstructor = typeof MissingNodeException
export type InvalidElementConstructor = typeof InvalidElementException
export type NoTextNodeConstructor = typeof NoTextNodeException
export type NoNextSiblingConstructor = typeof NoNextSiblingException
