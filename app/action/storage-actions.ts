import { Injectable, Inject } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Util } from '../service/util';

@Injectable()
export class StorageActions {
  constructor(
    private util: Util,
    private dispatcher: Dispatcher
  ) {}

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
