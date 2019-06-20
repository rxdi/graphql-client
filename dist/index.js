"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var GraphqlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const apollo_link_http_1 = require("apollo-link-http");
const graphql_injection_1 = require("./graphql.injection");
const apollo_client_1 = require("apollo-client");
const apollo_link_1 = require("apollo-link");
const apollo_link_ws_1 = require("apollo-link-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const apollo_utilities_1 = require("apollo-utilities");
let GraphqlModule = GraphqlModule_1 = class GraphqlModule {
    static forRoot({ uri, pubsub, authorization } = {}, documents = {}) {
        const connectionParams = { authorization: '' };
        return {
            module: GraphqlModule_1,
            providers: [
                {
                    provide: graphql_injection_1.GraphqlDocuments,
                    useValue: documents
                },
                {
                    provide: graphql_injection_1.ApolloClient,
                    useFactory: () => new apollo_client_1.ApolloClient({
                        link: apollo_link_1.concat(new apollo_link_1.ApolloLink((operation, forward) => {
                            const token = authorization || graphql_injection_1.noop;
                            const Authorization = token();
                            connectionParams.authorization = Authorization;
                            operation.setContext({
                                headers: {
                                    Authorization
                                }
                            });
                            return forward(operation);
                        }), apollo_link_1.split(({ query }) => {
                            const { kind, operation } = apollo_utilities_1.getMainDefinition(query);
                            return (kind === 'OperationDefinition' &&
                                operation === 'subscription');
                        }, new apollo_link_ws_1.WebSocketLink(new subscriptions_transport_ws_1.SubscriptionClient(pubsub, {
                            lazy: true,
                            connectionParams,
                            reconnect: true
                        })), apollo_link_http_1.createHttpLink({ uri }))),
                        cache: new apollo_cache_inmemory_1.InMemoryCache()
                    })
                }
            ]
        };
    }
};
GraphqlModule = GraphqlModule_1 = __decorate([
    core_1.Module({})
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
__export(require("./graphql.injection"));
__export(require("./graphq.helpers"));
