import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { SignInDto, SignUpDto } from './dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(body: SignUpDto) {
    const hash = await bcrypt.hash(body.password, SALT_ROUNDS);
    try {
      const user = await this.prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          hash: hash,
        },
      });

      return {
        message: 'User created successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
    }
  }

  async signIn(body: SignInDto) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const hash = user.hash;
    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const access_token = await this.signToken(user.id, user.email);
    return {
      access_token,
      data: user,
    };
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
