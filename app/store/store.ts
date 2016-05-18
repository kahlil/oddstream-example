import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { draftsReducers } from './drafts-reducers';
import { draftsEditorReducers } from './drafts-editor-reducers';
import { OddStream } from '..oddstream';

@Injectable()
export class Store {
  public draftsState$: Observable<Object>;
  public draftsEditorState$: Observable<Object>;

  constructor(private odds: OddStream) {
    // Create the state stream for the drafts list.
    this.draftsState$ = odds.makeStateStream(draftsReducers);

    // Create the state stream for the editor.
    // The editor state stream has the drafts state stream as a dependency
    // because the editor state also should have the id of the draft that is
    // edited.
    this.draftsEditorState$ = odds.makeStateStream(draftsEditorReducers)
      .combineLatest(this.draftsState$, (editorState, drafts: Array<{ id: number }>) => {
        const highestId = drafts.reduce((acc, draft) => (draft.id > acc) ? draft.id : acc, -1);
        editorState.newId = highestId + 1;
        return editorState;
      })
      .publishReplay(1).refCount();
  }
}
