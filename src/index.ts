import { Module, ModuleWithServices } from '@rxdi/core';
import ApolloClient, { PresetConfig } from 'apollo-boost';
import { GraphqlClient } from './injection.tokens';

@Module()
export class GraphqlModule {
  public static forRoot(config: PresetConfig, documents?: any): ModuleWithServices {
    return {
      module: GraphqlModule,
      services: [
        {
          provide: GraphqlClient,
          useFactory: () => new ApolloClient(config)
        },
        {
          provide: 'documents-graphql',
          useValue: documents || {}
        }
      ]
    };
  }
}

export * from './injection.tokens';