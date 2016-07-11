import { Injectable, Inject } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { findIndex } from 'lodash';
import { RECEIVE_DRAFTS } from '../action/action-constants';

@Injectable()
export class DraftsService {
  constructor(
    @Inject('LocalForage') private storage,
    @Inject('OddStream') private oddStream
  ) {}

  deleteDraft(id: any) {
    this.storage.getItem('drafts').then((drafts) => {
      const newDrafts = drafts.filter(d => d.id !== id);
      this.oddStream.dispatch(Observable.fromPromise(
        this.storage.setItem(`drafts`, newDrafts)
      ), RECEIVE_DRAFTS);
    });
  }

  saveDraft(draft: any) {
    this.storage.getItem('drafts').then((drafts) => {
      if (!drafts) {
        drafts = [];
      };
      const currentIndex = findIndex(drafts, ['id', draft.id]);
      if (currentIndex !== -1) {
        drafts[currentIndex] = draft;
      } else {
        drafts.unshift(draft);
      }
      this.oddStream.dispatch(Observable.fromPromise(
        this.storage.setItem(`drafts`, drafts)
      ), RECEIVE_DRAFTS);
    });
  }

  flagDraft(id: number) {
    this.storage.getItem('drafts').then((drafts) => {
      const currentIndex = findIndex(drafts, ['id', id]);
      drafts[currentIndex].flagged = !drafts[currentIndex].flagged;
      this.storage.setItem(`drafts`, drafts);
    });
  }

  getDrafts() {
    this.oddStream.dispatch(Observable
      .fromPromise(this.storage.getItem('drafts'))
      .map(result => result === null ? [] : result),
      RECEIVE_DRAFTS
    );
  }
}
