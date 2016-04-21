import { Injectable, OnInit } from 'angular2/core';
import { Dispatcher } from '../dispatcher/dispatcher';
import { DraftsService } from '../service/drafts';

@Injectable()
export class DraftsActions {
  constructor(
    private dispatcher: Dispatcher,
    private draftsService: DraftsService
  ) {}

  openEditor(openEditor$) {
    this.dispatcher.dispatch(openEditor$
      .map((data) => ({
        type: 'OPEN_EDITOR',
        data
      }))
    );
  }

  deleteDraft(deleteDraft$) {
    this.dispatcher.dispatch(deleteDraft$
      .map((id) => {
        // FIRE SIDE EFFECT!
        this.draftsService.deleteDraft(id);
        return {
          type: 'DELETE_DRAFT',
          data: id
        }
      })
    );
  }

  heartDraft(heartDraft$) {
    this.dispatcher.dispatch(heartDraft$
      .map(id => {
        // FIRE SIDE EFFECT!
        this.draftsService.heartDraft(id);
        return {
          type: 'HEART_DRAFT',
          data: id
        }
      })
    );
  }

  addDraft(addDraft$) {
    this.dispatcher.dispatch(addDraft$
      .map(draft => {
      // Convention: action creators are allowed to fire
      // side effects.
      // Here we are saving the new draft in localforage.
      this.draftsService.saveDraft(draft);
      return {
        type: 'ADD_DRAFT',
        data: draft
      }
    }));
  }

  getDrafts(getDrafts$) {
    this.dispatcher.dispatch(getDrafts$
      .map(action => {
        // Convention: action creators are allowed to fire
        // side effects.
        // Here we are saving the new draft in localforage.
        this.draftsService.getDrafts();
        return { type: 'GET_DRAFTS' }
      })
    );
  }

  receiveDrafts(receiveDrafts$) {
    this.dispatcher.dispatch(receiveDrafts$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: { drafts }
      }))
    );
  }

  filterHearted(filterHearted$) {
    this.dispatcher.dispatch(filterHearted$
      .map(() => ({ type: 'FILTER_HEARTED' }))
    );
  }
}
