import { LoginController } from './login.controller';
import { AuthTokenService } from '../../../libs/auth/src/lib/auth.token.service';
import { ConfigService } from '@nestjs/config';

describe('auth.login.controller.test', () => {
  const configService = new ConfigService({ secret: 'shhhhh' });
  const tokenService = new AuthTokenService(configService);

  it('should create an instance', () => {
    expect(new LoginController(tokenService)).toBeTruthy();
  });

  describe('login', () => {
    it('should return a token', async () => {
      const authLoginController = new LoginController(tokenService);
      const token = await authLoginController.login({
        username: 'test',
        password: 'asdfasdf1234',
      });
      expect(token).toBeTruthy();
    });

    it('token verifies by tokenService', async () => {
      const authLoginController = new LoginController(tokenService);
      const { token } = await authLoginController.login({
        username: 'test',
        password: 'asdfasdf1234',
      });
      expect(token).toBeTruthy();

      const verified = tokenService.verifyJwt(token);

      expect(verified).toBeTruthy();
    });
  });
});
