import { InjectionToken } from '@rxdi/core';
import { ApolloClient } from 'apollo-boost';
export declare const GraphqlClient: InjectionToken<ApolloClient<any>>;
export declare type GraphqlClient = ApolloClient<any>;
