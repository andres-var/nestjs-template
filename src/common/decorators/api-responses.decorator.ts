import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiResponses = () => {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: 'Server Error',
      schema: {
        example: {
          statusCode: 500,
          error: 'Internal Server Error',
        },
      },
    }),

    ApiForbiddenResponse({
      description: 'Forbidden.',
      schema: {
        example: {
          statusCode: 403,
          message: 'User [name] need a valid role: [roles]',
          error: 'Forbidden',
        },
      },
    }),

    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      },
    }),

    ApiBadRequestResponse({
      description: 'The server cannot process the information',
      schema: {
        oneOf: [
          {
            example: {
              statusCode: 400,
              message: [
                {
                  limit: [
                    'limit must not be greater than 50',
                    'limit must not be less than 1',
                    'limit must be an integer number',
                  ],
                },
              ],
              error: 'Bad Request',
            },
          },
          {
            example: {
              statusCode: 400,
              message: 'Validation failed (uuid is expected)',
              error: 'Bad Request',
            },
          },
        ],
      },
    }),
  );
};
