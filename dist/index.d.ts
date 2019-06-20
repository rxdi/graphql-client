import { ModuleWithServices } from '@rxdi/core';
import { GraphqlModuleConfig } from './graphql.injection';
export declare class GraphqlModule {
    static forRoot({ uri, pubsub, authorization }?: GraphqlModuleConfig, documents?: {}): ModuleWithServices;
}
