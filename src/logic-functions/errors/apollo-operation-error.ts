import { ApolloError } from 'src/logic-functions/errors/apollo-error';
import { ApolloErrorCode } from 'src/logic-functions/errors/apollo-error-code';

export class ApolloOperationError extends ApolloError {
  constructor(message: string) {
    super({ message, code: ApolloErrorCode.OPERATION_FAILED });
  }
}
