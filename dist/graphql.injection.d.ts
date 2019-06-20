import { InjectionToken } from '@rxdi/core';
import { ApolloClient as AC } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
export declare const ApolloClient: InjectionToken<AC<NormalizedCacheObject>>;
export declare const GraphqlDocuments = "graphql-documents";
export interface GraphqlModuleConfig {
    uri: string;
    pubsub: string;
    authorization?(): string;
}
export declare const noop: () => string;
