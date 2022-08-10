import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}

export class SignInResponseDto {
  @ApiProperty()
  access_token: string;
}
