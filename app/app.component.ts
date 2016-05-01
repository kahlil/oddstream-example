import { Component, provide, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
// Components
import { DraftsListComponent } from './drafts-list.component';
import { DraftEditorComponent } from './draft-editor.component';
// Services
import { DraftsService } from './service/drafts';
// Flux
import { ActionCreator } from './action/action-creator';
import { draftsActions } from './action/drafts-actions';
import { StorageActions } from './action/storage-actions';
import { DraftsStore } from './store/drafts-store';
import { DraftsEditorStore } from './store/drafts-editor-store';
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
    provide('DraftsActions', {
      useFactory: draftsActions,
      deps: [DraftsService]
    }),
    DraftsService,
    ActionCreator,
    StorageActions,
    DraftsStore,
    DraftsEditorStore,
    ROUTER_PROVIDERS,
  ]
})
@RouteConfig([{ path: '/', component: DraftsListComponent, name: 'DraftsList' }])
export class AppComponent implements OnInit {
  constructor(
    private draftsStore: DraftsStore,
    private actionCreator: ActionCreator
  ) {}

  ngOnInit() {
    this.actionCreator.createAction(Observable.of(['GET_DRAFTS']), 'GET_DRAFTS');
  }
}
