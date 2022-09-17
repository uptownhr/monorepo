import { ConfigModule } from '@nestjs/config';
import { AuthTokenService } from './auth.token.service';

export interface AuthModuleConfigurationOptions {
  secret: string;
}

export class AuthModule {
  static forRoot(options: AuthModuleConfigurationOptions) {
    const configuration = (): AuthModuleConfigurationOptions => ({
      secret: options.secret,
    });

    return {
      module: AuthModule,
      imports: [ConfigModule.forFeature(configuration)],
      providers: [AuthTokenService],
      exports: [AuthTokenService],
    };
  }
}
