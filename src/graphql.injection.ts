import { InjectionToken } from '@rxdi/core';
import { ApolloClient as AC } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
export const ApolloClient = new InjectionToken<AC<NormalizedCacheObject>>(
  'apollo-link'
);

export const GraphqlDocuments = 'graphql-documents';

export interface GraphqlModuleConfig {
  uri: string;
  pubsub: string;
  authorization?(): string;
}
export const noop = () => '';
