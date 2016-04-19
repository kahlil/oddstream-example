import { Injectable, Inject } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';

@Injectable()
export class StorageActions {
  constructor(private dispatcher: Dispatcher) {}

  draftsSaved(draftsSaved$) {
    const draftsSavedActions$ = draftsSaved$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: drafts
      }));

    this.dispatcher.dispatch(draftsSavedActions$);
  }

  receiveDrafts(receiveDrafts$) {
    const receiveDraftsActions$ = receiveDrafts$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: drafts
      }));

    this.dispatcher.dispatch(receiveDraftsActions$);
  }
}
