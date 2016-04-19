import { Component, provide, Inject, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Components
import { DraftsListComponent } from './drafts-list.component';
import { DraftEditorComponent } from './draft-editor.component';
// Services
import { DraftsService } from './service/drafts';
// Factories
import { Util } from './service/util';
// Flux
import { Dispatcher } from './dispatcher/dispatcher';
import { DraftsActions } from './action/drafts-actions';
import { StorageActions } from './action/storage-actions';
import { DraftsStore } from './store/drafts-store';
import { DraftsEditorStore } from './store/drafts-editor-store';
// Libs
import localforage from 'localforage';
import _ from 'lodash';
// Rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/combineLatest';
// Rx observable methods
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromArray';
import 'rxjs/add/observable/fromPromise';

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
    Util,
    DraftsService,
    Dispatcher,
    DraftsActions,
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
    private draftsActions: DraftsActions
  ) {}

  ngOnInit() {
		this.draftsActions.getDrafts(Observable.of(['GET_DRAFTS']));
  }
}
