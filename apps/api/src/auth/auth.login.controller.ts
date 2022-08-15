import { AuthTokenService } from './auth.token.service';
import { Body, Controller, Post } from '@nestjs/common';

interface AuthControllerLoginInput {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly tokenService: AuthTokenService) {}

  @Post('/login')
  login(@Body() input: AuthControllerLoginInput) {
    if (input.password !== 'asdfasdf1234') throw new Error('bad pass');

    return {
      token: this.tokenService.createJwt(),
    };
  }
}
