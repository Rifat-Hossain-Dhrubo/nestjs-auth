import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

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

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
