import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseStatus } from 'src/response/dto/response.dto';
import { UserDto } from 'src/user/dto/user.dto';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @ApiExtraModels(UserDto)
  @ApiCreatedResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          enum: [ApiResponseStatus.success, ApiResponseStatus.error],
        },
        data: {
          type: 'object',
          allOf: [{ $ref: getSchemaPath(UserDto) }],
          properties: {
            access_token: { type: 'string' },
          },
        },
      },
    },
  })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
