import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Observable } from 'rxjs/Observable';
import { reducers } from './drafts-store-reducers';
import { Odds } from '../odds';
// import { makeStateStream } from '../util';

@Injectable()
export class DraftsStore {
  public state$: Observable<Object>;
  constructor(
    private dispatcher: Dispatcher,
    private odds: Odds
  ) {
    this.state$ = odds.makeStateStream(reducers);
  }
}
