import { AuthLoginController } from './auth.login.controller';
import { AuthTokenService } from './auth.token.service';
import { ConfigModule } from '@nestjs/config';

export interface AuthModuleConfigurationOptions {
  secret: string;
}

export class AuthModule {
  static forRoot(options: AuthModuleConfigurationOptions) {
    const configuration = () => ({
      secret: options.secret,
    });

    return {
      module: AuthModule,
      imports: [ConfigModule.forFeature(configuration)],
      controllers: [AuthLoginController],
      providers: [AuthTokenService],
    };
  }
}
