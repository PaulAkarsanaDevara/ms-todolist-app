import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Token } from './models/token.model';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  async register(@Args('data') data: RegisterInput) {
    return this.authService.register(data);
  }

  @Mutation(() => Token)
  async login(@Args('data') data: LoginInput) {
    return this.authService.login(data);
  }
}
