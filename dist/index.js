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
const apollo_boost_1 = require("apollo-boost");
const injection_tokens_1 = require("./injection.tokens");
let GraphqlModule = GraphqlModule_1 = class GraphqlModule {
    static forRoot(config, documents) {
        return {
            module: GraphqlModule_1,
            services: [
                {
                    provide: injection_tokens_1.GraphqlClient,
                    useFactory: () => new apollo_boost_1.default(config)
                },
                {
                    provide: 'documents-graphql',
                    useValue: documents || {}
                }
            ]
        };
    }
};
GraphqlModule = GraphqlModule_1 = __decorate([
    core_1.Module()
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
__export(require("./injection.tokens"));
__export(require("./graphql-helpers"));
