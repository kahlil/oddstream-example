import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { DraftsStore } from './drafts-store';
import { Observable } from 'rxjs/Observable';
import { curry, camelCase, last } from 'lodash';

@Injectable()
export class DraftsEditorStore {
  public state$: Observable<Object>;

  constructor(
    private dispatcher: Dispatcher,
    private draftsStore: DraftsStore
  ) {
    this.state$ = this.processActions(dispatcher.dispatcher$, draftsStore.state$);
  }

  processActions(dispatcher$, drafts$) {
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
      .scan((state, reducer) => reducer(state), { isDisabled: true })
      .combineLatest(drafts$, (editorState, drafts) => {
        const highestId = drafts.reduce((acc, draft) => {
          if (draft.id > acc) {
            return draft.id
          } else {
            return acc;
          }
        }, -1);

        editorState.newId = highestId + 1;

        return editorState;
      })
      .publishReplay(1).refCount();
  }

  openEditor(action, state) {
    return { isEnsabled: true }
  }

  addDraft(action, state) {
    return { isEnsabled: false }
  }
}
