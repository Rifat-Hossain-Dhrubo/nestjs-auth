import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

import { UserDto } from './dto';

@UseGuards(JwtGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get('me')
  @ApiOkResponse({
    type: UserDto,
  })
  getCurrentUser(@GetUser() user: User) {
    return user;
  }
}
