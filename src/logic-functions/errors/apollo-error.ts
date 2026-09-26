import { type ApolloErrorCode } from 'src/logic-functions/errors/apollo-error-code';

export abstract class ApolloError extends Error {
  readonly code: ApolloErrorCode;

  constructor({ message, code }: { message: string; code: ApolloErrorCode }) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
    this.code = code;
  }
}
