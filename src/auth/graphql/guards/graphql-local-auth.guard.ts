import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "../../services/auth.service";

@Injectable()
export class GraphqlLocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean  {
    const ctx = GqlExecutionContext.create(context);
    const {username, password} = ctx.getArgs();
    const user = this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();
    return true;
  }
}
