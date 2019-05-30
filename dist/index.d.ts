import { ModuleWithServices } from '@rxdi/core';
import { PresetConfig } from 'apollo-boost';
export declare class GraphqlModule {
    static forRoot(config: PresetConfig, documents?: any): ModuleWithServices;
}
export * from './injection.tokens';
