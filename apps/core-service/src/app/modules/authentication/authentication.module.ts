//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreV1ServiceModule } from '../core/core-v1-service.module';
import { EventClientModule } from '../event-client/event-client.module';
import { getConfiguration } from './configuration';
import { V1ControllerForgotPasswordController } from './modules/v1/controllers/v1.forgot-password.controller';
import { V1AuthController } from './modules/v1/controllers/v1.login.controller';
import { V1RefreshController } from './modules/v1/controllers/v1.refresh.controller';
import { V1SwitchUserController } from './modules/v1/controllers/v1.switch-user.controller';
import { V1UpgradeController } from './modules/v1/controllers/v1.upgrade.controller';
import { AuthV1Service } from './modules/v1/services/auth-v1-service';
import { AuthV2Service } from './modules/v1/services/auth-v2.service';
import { AuthV1CookieService } from './modules/v1/services/cookie-v1.service';
import { AuthV1AccessTokenService } from './modules/v1/services/v1.access-token.service';
import { AuthV1RefreshTokenService } from './modules/v1/services/v1.refresh-token.service';
import { InternalV3MasqController } from './modules/v3/controllers/internal-v3.masq.controller';
import { InternalV3NonceController } from './modules/v3/controllers/internal-v3.nonce-controller';
import { V3AuthController } from './modules/v3/controllers/v3.auth.controller';
import { V3TokenController } from './modules/v3/controllers/v3.token.controller';
import { AuthV3Service } from './modules/v3/services/auth-v3.service';
import { NonceV3Service } from './modules/v3/services/nonce-v3.service';
import { SsoTokenService } from './modules/v3/services/sso-token.service';
import { TokenV3Service } from './modules/v3/services/token-v3.service';
import { AuthServiceRepository } from './repositories/auth-service.repository';
import { SsoConfigurationRepository } from './repositories/sso-configuration.repository';
import { SsoClientConfiguration, SsoClientConfigurationSchema } from './schemas/SsoClientConfiguration.schema';

import { AuthMfaChallengeResolver } from './modules/mfa/graphql/resolvers/auth-mfa-challenge.resolver';
import { AuthMfaSmsEnrollmentResolver } from './modules/mfa/graphql/resolvers/auth-mfa-sms-enrollment.resolver';
import { MfaRepository } from './modules/mfa/repositories/mfa.repository';
import * as mfaServices from './modules/mfa/services';
import { MfaEnrollmentService } from './modules/mfa/services/mfa-enrollment.service';
import { V1OpenIdController } from './modules/v1/controllers/openid-v1.controller';
import { OpenIdV1Service } from './modules/v1/services/openid-v1.service';
import { V3OpenIdController } from './modules/v3/controllers/openid-v3.controller';
import * as authProviders from './modules/v3/providers';
import { OpenIdV3Service } from './modules/v3/services/openid-v3.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [getConfiguration()],
    }),
    MongooseModule.forFeature([{ name: SsoClientConfiguration.name, schema: SsoClientConfigurationSchema }]),
    CoreV1ServiceModule,
    EventClientModule,
  ],
  providers: [
    /**
     * OpenID
     */
    ...Object.values(authProviders),

    /* repositories */
    AuthServiceRepository,
    SsoConfigurationRepository,
    MfaRepository,

    /*services*/
    AuthV3Service,
    NonceV3Service,
    SsoTokenService,
    TokenV3Service,
    OpenIdV3Service,
    OpenIdV1Service,
    AuthV1Service,
    AuthV2Service,
    AuthV1CookieService,
    AuthV1AccessTokenService,
    AuthV1RefreshTokenService,
    ...Object.values(mfaServices),

    /** Resolvers */
    AuthMfaSmsEnrollmentResolver,
    AuthMfaChallengeResolver,
    MfaEnrollmentService,

    /* controllers so they can be exported */
    InternalV3MasqController,
    InternalV3NonceController,

    /**
     * Legacy api-v2 services
     */
  ],
  controllers: [
    V3AuthController,
    V3TokenController,
    InternalV3MasqController,
    InternalV3NonceController,
    V3OpenIdController,
    V1OpenIdController,

    /**
     * Legacy api-v2 controllers
     */
    V1AuthController,
    V1SwitchUserController,
    V1RefreshController,
    V1UpgradeController,
    V1ControllerForgotPasswordController,
  ],
  exports: [InternalV3MasqController, InternalV3NonceController],
})
export class AuthenticationModule {}
