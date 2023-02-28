import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log("authtest");
    const request = context.switchToHttp().getRequest()
    const temp = request.isAuthenticated();
    console.log(temp);
    return request.isAuthenticated()
  }
}