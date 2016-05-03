import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Observable } from 'rxjs/Observable';
import { reducers } from './drafts-store-reducers';
import { makeStateStream } from '../util';
import { Odds } from '../odds';

@Injectable()
export class DraftsStore {
  public state$: Observable<Object>;
  constructor(
    dispatcher: Dispatcher,
    private odds: Odds
  ) {
    this.state$ = makeStateStream(dispatcher.dispatcher$, reducers);
  }
}
