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
    // this.draftsSaved = util.makeActionCreator('draftsSaved', dispatcher);
    // this.draftsReceived = util.makeActionCreator('draftsReceived', dispatcher);
  }
}
