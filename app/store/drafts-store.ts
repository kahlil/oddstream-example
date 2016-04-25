import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Observable } from 'rxjs/Observable';
import { curry, camelCase, last } from 'lodash';
import { reducers } from './drafts-store-reducers';
import { makeReducer$ } from '../util';

@Injectable()
export class DraftsStore {
  public state$: Observable<Object>;

  constructor(private dispatcher: Dispatcher) {
    const reducer$ = curry(makeReducer$)(dispatcher.dispatcher$, reducers);
    this.state$ = Observable
      .merge(
        reducer$('DELETE_DRAFT'),
        reducer$('ADD_DRAFT'),
        reducer$('RECEIVE_DRAFTS'),
        reducer$('DRAFTS_SAVED'),
        reducer$('FLAG_DRAFT'),
        reducer$('FILTER_FLAGGED')
      )
      .scan((state: [{}], reducer) => reducer(state), [])
      .publishReplay(1).refCount();
  }
}
