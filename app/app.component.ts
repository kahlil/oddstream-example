import { Component, provide, Inject, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import OddStream from 'oddstream';

// Components
import { DraftsListComponent } from './drafts-list.component';
import { DraftEditorComponent } from './draft-editor.component';
// Services
import { DraftsService } from './service/drafts';
// Flux
import { Effects } from './effects';
import { Store } from './store/store';
import { actionCreators } from './action/action-creators';
// Libs
import localforage from 'localforage';

@Component({
  selector: 'tinydraft-app',
  template: `
    <draft-editor></draft-editor>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="title">tinydraft</h1>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .title {
      text-align: center;
      margin-top: 2rem;
      padding-bottom: 1rem;
    }
  `],
  directives: [DraftEditorComponent, ROUTER_DIRECTIVES],
  providers: [
    provide('LocalForage', { useValue: localforage }),
    provide('OddStream', { useValue: new OddStream() }),
    DraftsService,
    Store,
    Effects,
    ROUTER_PROVIDERS,
  ]
})
@RouteConfig([{ path: '/', component: DraftsListComponent, name: 'DraftsList' }])
export class AppComponent implements OnInit {
  constructor(
    private effects: Effects,
    @Inject('OddStream') private oddStream
  ) {}

  ngOnInit() {
    console.log('OddStream', this.oddStream);
    this.oddStream.setActionCreators(actionCreators);
    this.effects.runEffects();
  }
}
