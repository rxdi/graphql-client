import { Module, ModuleWithServices } from '@rxdi/core';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, GraphqlDocuments, GraphqlModuleConfig, noop } from './graphql.injection';
import { ApolloClient as AC } from 'apollo-client';
import { concat, ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';

@Module({})
export class GraphqlModule {
  public static forRoot(
    { uri, pubsub, authorization }: GraphqlModuleConfig = {} as any,
    documents = {}
  ): ModuleWithServices {
    const connectionParams = { authorization: '' };
    return {
      module: GraphqlModule,
      providers: [
        {
          provide: GraphqlDocuments,
          useValue: documents
        },
        {
          provide: ApolloClient,
          useFactory: () =>
            new AC({
              link: concat(
                new ApolloLink((operation, forward) => {
                  const token = authorization || noop;
                  const Authorization = token();
                  connectionParams.authorization = Authorization;
                  operation.setContext({
                    headers: {
                      Authorization
                    }
                  });
                  return forward(operation);
                }),
                split(
                  // split based on operation type
                  ({ query }) => {
                    const { kind, operation } = getMainDefinition(query);
                    return (
                      kind === 'OperationDefinition' &&
                      operation === 'subscription'
                    );
                  },
                  new WebSocketLink(
                    new SubscriptionClient(pubsub, {
                      lazy: true,
                      connectionParams,
                      reconnect: true
                    })
                  ),
                  createHttpLink({ uri })
                )
              ),
              cache: new InMemoryCache()
            })
        }
      ]
    };
  }
}
