import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseStatus } from 'src/response/dto/response.dto';
import { UserDto } from 'src/user/dto/user.dto';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  @ApiExtraModels(UserDto)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          enum: [ApiResponseStatus.success, ApiResponseStatus.error],
        },
        access_token: { type: 'string' },
        data: {
          type: 'object',
          allOf: [{ $ref: getSchemaPath(UserDto) }],
        },
      },
    },
  })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
