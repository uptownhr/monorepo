import { AuthTokenService } from '@uptownhr/auth';
import { Body, Controller, Post } from '@nestjs/common';

interface LoginControllerInput {
  username: string;
  password: string;
}

@Controller('auth')
export class LoginController {
  constructor(private readonly tokenService: AuthTokenService) {}

  @Post('/login')
  login(@Body() input: LoginControllerInput) {
    if (input.password !== 'asdfasdf1234') throw new Error('bad pass');

    return {
      token: this.tokenService.createJwt(),
    };
  }
}
