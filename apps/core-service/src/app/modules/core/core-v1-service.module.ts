//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsModule } from '../aws/aws.module';
import { EventClientModule } from '../event-client/event-client.module';
import { HealthcheckModule } from '../healthcheck/healthcheck.module';
import * as CompanyRoleModule from './company-role';
import { InternalCompanyRoleV1Controller } from './company-role/controllers';
import * as CoreAuthModule from './core-auth';
import { InternalCoreAuthController } from './core-auth/controllers/internal-core-auth.controller';
import * as CoreCompanyModule from './core-company';
import { InternalCompanyV1Controller } from './core-company/controllers';
import * as CoreUserModule from './core-user';
import * as CoreUserGroupModule from './core-user-groups';
import { InternalCoreUserGroupV1Controller } from './core-user-groups/controllers';
import { InternalUserV1Controller } from './core-user/controllers';
import { resolvers } from './graphql-resolvers.list';
import { ReadonlyCorePrismaService } from './prisma/core-prisma-readonly.service';
import { CorePrismaService } from './prisma/core-prisma.service';
import * as WorkerRoleModule from './worker-role';
import { InternalWorkerRoleV1Controller } from './worker-role/controllers';

@Module({
  imports: [
    HealthcheckModule,
    AwsModule,
    EventClientModule,
    MongooseModule.forFeature([
      ...Object.values(CoreAuthModule.modelDefinitions),
      ...Object.values(CoreUserModule.modelDefinitions),
      ...Object.values(CoreCompanyModule.modelDefinitions),
    ]),
  ],
  controllers: [
    ...Object.values(CoreCompanyModule.controllers),
    ...Object.values(CoreUserGroupModule.controllers),
    ...Object.values(CoreUserModule.controllers),
    ...Object.values(CoreAuthModule.controllers),
    ...Object.values(CompanyRoleModule.controllers),
    ...Object.values(WorkerRoleModule.controllers),
  ],
  providers: [
    // THE DB
    CorePrismaService,
    ReadonlyCorePrismaService,

    // auth
    ...Object.values(CoreAuthModule.dataLoaders),
    ...Object.values(CoreAuthModule.repositories),
    ...Object.values(CoreAuthModule.services),

    // company
    ...Object.values(CoreCompanyModule.dataLoaders),
    ...Object.values(CoreCompanyModule.repositories),
    ...Object.values(CoreCompanyModule.services),

    // user
    ...Object.values(CoreUserModule.dataLoaders),
    ...Object.values(CoreUserModule.repositories),
    ...Object.values(CoreUserModule.services),

    // user groups
    ...Object.values(CoreUserGroupModule.controllers), // can also be injected, not just used as a REST controller
    ...Object.values(CoreUserGroupModule.dataLoaders),
    ...Object.values(CoreUserGroupModule.repositories),
    ...Object.values(CoreUserGroupModule.services),

    // company roles
    ...Object.values(CompanyRoleModule.controllers), // can also be injected, not just used as a REST controller
    ...Object.values(CompanyRoleModule.dataLoaders),
    ...Object.values(CompanyRoleModule.repositories),
    ...Object.values(CompanyRoleModule.services),

    // worker roles
    ...Object.values(WorkerRoleModule.controllers), // can also be injected, not just used as a REST controller
    ...Object.values(WorkerRoleModule.dataLoaders),
    ...Object.values(WorkerRoleModule.repositories),
    ...Object.values(WorkerRoleModule.services),

    /* controllers-as-providers */
    InternalCoreUserGroupV1Controller,
    InternalCoreAuthController,
    InternalCompanyV1Controller,
    InternalCompanyRoleV1Controller,
    InternalWorkerRoleV1Controller,
    InternalUserV1Controller,

    /* GraphQL Resolvers*/
    ...resolvers,
  ],
  exports: [
    InternalCoreUserGroupV1Controller,
    InternalCoreAuthController,
    InternalCompanyV1Controller,
    InternalUserV1Controller,
    InternalCompanyRoleV1Controller,
    InternalWorkerRoleV1Controller,
    CorePrismaService,
  ],
})
export class CoreV1ServiceModule {}
