import { Injectable } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Util } from '../service/util';

@Injectable()
export class DraftsActions {
  public openEditor: any;

  constructor(
    private dispatcher: Dispatcher,
    private util: Util
  ) {
    this.openEditor = util.makeActionCreator('openEditor', dispatcher);
  }

  deleteDraft(deleteDraft$) {
    const deleteDraftAction$ = deleteDraft$
      .map((id) => ({
        type: 'DELETE_DRAFT',
        data: { id }
      }));

    this.dispatcher.dispatch(deleteDraftAction$);
  }

  addDraft(addDraft$) {
    const addDraftAction$ = addDraft$
      .map(text => ({
        type: 'ADD_DRAFT',
        data: { text }
      }));

    this.dispatcher.dispatch(addDraftAction$);
  }

  receiveDrafts(receiveDrafts$) {
    const receiveDraftsActions$ = receiveDrafts$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: { drafts }
      }));

    this.dispatcher.dispatch(receiveDraftsActions$);
  }
}
