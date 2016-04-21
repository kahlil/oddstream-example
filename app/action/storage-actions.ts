import { Injectable, Inject } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';

@Injectable()
export class StorageActions {
  constructor(private dispatcher: Dispatcher) {}

  draftsSaved(draftsSaved$) {
    this.dispatcher.dispatch(draftsSaved$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: drafts
      }))
    );
  }

  receiveDrafts(receiveDrafts$) {
    this.dispatcher.dispatch(receiveDrafts$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: drafts
      }))
    );
  }
}
