import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiResponses = () => {
  return applyDecorators(
    ApiInternalServerErrorResponse({ description: 'Server Error' }),
    ApiForbiddenResponse({ description: 'Forbidden.' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBadRequestResponse({
      description: 'The server cannot process the information',
    }),
  );
};
