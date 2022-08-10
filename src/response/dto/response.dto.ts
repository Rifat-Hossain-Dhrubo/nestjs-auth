import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export enum ApiResponseStatus {
  success = 'success',
  error = 'error',
}
