import { Container } from '@rxdi/core';

export function importQuery<T>(search: T) {
    let result;
    const DOCUMENTS = Container.get('documents-graphql');
    Object.keys(DOCUMENTS)
    .filter(doc => {
      if (doc.indexOf(<any>search) !== -1) {
        result = DOCUMENTS[doc];
      }
    });
    if (!result) {
      throw new Error(`Missing query: ${search}`);
    }
    return result;
}