import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
//TODO: Fix the import path to avoid the module boundaries issue
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  authenticate(
    request: AuthenticateRequest,
  ): Promise<User> | Observable<User> | User {
    console.log('Received authentication request:', request);
    return {} as User;
  }
}
