import { Injectable, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { StorageActions } from '../action/storage-actions';

@Injectable()
export class DraftsService {
  constructor(
    // @Inject('LocalForage') private storage,
    // private storageActions: StorageActions
  ) {}

  // saveDrafts(value: Array<Object>) {
  //   const draftsSaved$ = Observable
  //     .fromPromise(this.storage.setItem('drafts', value));
  //
  //   this.storageActions.draftsSaved(draftsSaved$);
  // }
  //
  // getDrafts() {
  //   const draftsReceived$ = Observable
  //     .fromPromise(this.storage.getItem('drafts'));
  //
  //   this.storageActions.draftsReceived(draftsReceived$);
  // }
}
