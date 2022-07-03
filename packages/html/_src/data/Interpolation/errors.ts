export class InvalidTemplateException {
  constructor(readonly text: string) {}
}

export type InvalidTemplateExceptionConstructor = typeof InvalidTemplateException
