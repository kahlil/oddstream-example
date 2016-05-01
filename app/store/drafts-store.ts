import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Observable } from 'rxjs/Observable';
import { reducers } from './drafts-store-reducers';
import { makeStateStream } from '../util';

@Injectable()
export class DraftsStore {
  public state$: Observable<Object>;
  constructor(dispatcher: Dispatcher) {
    this.state$ = makeStateStream(dispatcher.dispatcher$, reducers);
  }
}
