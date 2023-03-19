import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SignupAuthGuard extends AuthGuard('signup') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(request.body);
    const result = (await super.canActivate(context)) as boolean;
    await super.logIn(request);
    return result;
  }
}
