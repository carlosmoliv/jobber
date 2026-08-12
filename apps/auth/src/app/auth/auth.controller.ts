import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
//TODO: Fix the import path to avoid the module boundaries issue
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload },
  ): Promise<User> | Observable<User> | User {
    console.log('Received authentication request:', request);
    return this.usersService.getUser({ id: request.user.userId });
  }
}
