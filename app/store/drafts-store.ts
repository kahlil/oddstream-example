import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Observable } from 'rxjs/Observable';
import { curry, camelCase, last } from 'lodash';

@Injectable()
export class DraftsStore {
  public state$: Observable<Object>;

  constructor(private dispatcher: Dispatcher) {
    this.state$ = this.processActions(this.dispatcher.dispatcher$);
  }

  processActions(dispatcher$) {
    // In the .map-step we also want to partially apply the action
    // parameter. That's why the reducer function is being curried.
    const curriedReducer = actionType => curry(this[camelCase(actionType)]);

    return dispatcher$
      // Convention: the reducer for an action has the same name
      // as the action, just camelcased.
      .filter(action => !!this[camelCase(action.type)])
      // Map the action to it's redcuer and preload (partially apply)
      // it with the action parameter.
      .map(action => curriedReducer(action.type)(action))
      // We now have a stream of reducers.
      // Apply them on the state as they come through.
      .scan((state, reducer) => reducer(state), [])
      .publishReplay(1).refCount();
  }

  deleteDraft(action, state) {
    return state.filter(draft => draft.id !== action.data)
  }

  addDraft(action, state) {
    console.log(action)
    return [...state, { id: action.data.id, text: action.data.text }];
  }

  receiveDrafts(action, state) {
    return [...action.data];
  }

  draftsSaved(action, state) {
    return state;
  }

  heartDraft(action, state) {
    return state
      .map(draft => {
        if (draft.id === action.data) {
          draft.hearted = !draft.hearted;
        }
        return draft;
      });
  }

  filterHearted(action, state) {
    return state
      .map(draft => {
        if (!draft.hearted) {
          draft.hide = !draft.hide;
        }
        return draft;
      });
  }
}
