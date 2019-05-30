# Router module for client side rxdi application

#### Install
```bash
npm i @rxdi/router
```

#### Define routes with forRoot these will be evaluated lazy

```typescript
import { Component, Injector } from '@rxdi/core';
import { html } from 'lit-html';
import { subscribe } from 'lit-rx';
import { from, timer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IQuery } from '@introspection';
import { GraphqlClient } from './graphql/injection.tokens';
import { importQuery } from './graphql/graphql-helpers';
import { BaseView } from './shared/base.component';

@Component()
export class AppComponent extends BaseView {
  @Injector(GraphqlClient) private graphql: GraphqlClient;

  render() {
    return html`
    <p>
      ${subscribe(
        from(this.getServerStatus()).pipe(
          map(res => JSON.stringify(res.getCrowdsaleInfo, null, 4))
        )
      )}
    </p>
  `;
  }

  getServerStatus = () => {
    return from(
      this.graphql.query<IQuery>({
        query: importQuery('app.query.graphql')
      })
    ).pipe(
      map(res => res.data),
      map(res => res)
    );
  };

  peshO = async () => {
      return html`
      ${subscribe(of('gosho prosto shte rbot'))}
      `
  }
}

customElements.define('app-component', AppComponent);

```
