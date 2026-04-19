import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginInput } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginInput, response: Response): Promise<any> {
    const user = await this.verifyUser(input.email, input.password);

    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRATION_MS')),
    );
    const tokenPayload = { userId: user.id };
    const accessToken = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires,
      secure: this.configService.getOrThrow('NODE_ENV') === 'production',
    });

    return user;
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
