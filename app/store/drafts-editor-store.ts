import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Odds } from '../odds';
import { DraftsStore } from './drafts-store';
import { reducers } from './drafts-editor-store-reducers';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DraftsEditorStore {
  public state$: Observable<Object>;

  constructor(
    private dispatcher: Dispatcher,
    private draftsStore: DraftsStore,
    private odds: Odds
  ) {
    console.log(reducers);
    this.state$ = odds.makeStateStream(reducers)
      .combineLatest(draftsStore.state$, (editorState, drafts: Array<{ id: number }>) => {
        const highestId = drafts.reduce((acc, draft) => (draft.id > acc) ? draft.id : acc, -1);
        editorState.newId = highestId + 1;
        return editorState;
      })
      .publishReplay(1).refCount();
  }
}
