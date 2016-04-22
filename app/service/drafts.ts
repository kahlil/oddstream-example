import { Injectable, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { StorageActions } from '../action/storage-actions';
import { findIndex } from 'lodash';

@Injectable()
export class DraftsService {
  constructor(
    @Inject('LocalForage') private storage,
    private storageActions: StorageActions
  ) {}

  deleteDraft(id: any) {
    this.storage.getItem('drafts').then((drafts) => {
      const newDrafts = drafts.filter(d => d.id !== id);
      this.storageActions.draftsSaved(Observable.fromPromise(
        this.storage.setItem(`drafts`, newDrafts)
      ));
    })
  }

  saveDraft(draft: any) {
    this.storage.getItem('drafts').then((drafts) => {
      if (!drafts) drafts = [];
      const currentIndex = findIndex(drafts, ['id', draft.id]);
      if (currentIndex !== -1) {
        drafts[currentIndex] = draft;
      } else {
        drafts.unshift(draft);
      }
      this.storageActions.draftsSaved(Observable.fromPromise(
        this.storage.setItem(`drafts`, drafts)
      ));
    })
  }

  heartDraft(id: number) {
    this.storage.getItem('drafts').then((drafts) => {
      const currentIndex = findIndex(drafts, ['id', id]);
      drafts[currentIndex].flagged = !drafts[currentIndex].flagged;
      this.storage.setItem(`drafts`, drafts)
    })
  }

  getDrafts() {
    this.storageActions.receiveDrafts(Observable
      .fromPromise(this.storage.getItem('drafts'))
      .map(result => {
        return result === null ? [] : result
      })
    );
  }
}
