import { Injectable, Inject } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { Util } from '../service/util';

@Injectable()
export class StorageActions {
  public draftsSaved: any;
  public draftsReceived: any;

  constructor(
    private util: Util,
    private dispatcher: Dispatcher
  ) {
    this.draftsSaved = util.makeActionCreator('draftsSaved');
    // this.draftsReceived = util.makeActionCreator('draftsReceived');
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
