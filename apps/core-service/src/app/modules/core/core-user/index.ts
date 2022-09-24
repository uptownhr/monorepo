//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export * as controllers from './controllers';
export * as dataLoaders from './dataloaders';
export * as resolvers from './graphql/resolvers';
export * as repositories from './repositories';
export { modelDefinitions } from './schemas';
export * as services from './services';

/**
 * TODO: make this a proper module
 * @Module({
 *   providers: [services, repositories, controllers, resolvers]
 *   exports: [services, repositories, resolvers]
 * })
 * export class CoreUserModule
 *
 */
