import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Token } from "../models/token.model";
import { AuthService } from "../../services/auth.service";
import { UseGuards } from "@nestjs/common";
import { GraphqlLocalAuthGuard } from "../guards/graphql-local-auth.guard";

@Resolver(of => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GraphqlLocalAuthGuard)
  @Mutation(returns => Token, { description: 'Login a user to get a JWT token' })
  login(@Args("username") username: string, @Args('password') password: string): Token {
    return this.authService.generateAccessToken({ username, password });
  }
}
