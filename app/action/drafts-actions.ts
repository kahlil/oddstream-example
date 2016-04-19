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
    const openEditorAction$ = openEditor$
      .map((data) => ({
        type: 'OPEN_EDITOR',
        data
      }));

    this.dispatcher.dispatch(openEditorAction$);
  }

  deleteDraft(deleteDraft$) {
    const deleteDraftAction$ = deleteDraft$
      .map((id) => {
        // FIRE SIDE EFFECT!
        this.draftsService.deleteDraft(id);
        return {
          type: 'DELETE_DRAFT',
          data: id
        }
      });

    this.dispatcher.dispatch(deleteDraftAction$);
  }

  heartDraft(heartDraft$) {
    const heartDraftAction$ = heartDraft$.map(id => {
      // FIRE SIDE EFFECT!
      this.draftsService.heartDraft(id);
      return {
        type: 'HEART_DRAFT',
        data: id
      }
    });

    this.dispatcher.dispatch(heartDraftAction$);
  }

  addDraft(addDraft$) {
    const addDraftAction$ = addDraft$.map(draft => {
      // Convention: action creators are allowed to fire
      // side effects.
      // Here we are saving the new draft in localforage.
      this.draftsService.saveDraft(draft);
      return {
        type: 'ADD_DRAFT',
        data: draft
      }
    });

    this.dispatcher.dispatch(addDraftAction$);
  }

  getDrafts(getDrafts$) {
    const getDraftsAction$ = getDrafts$.map(action => {
      // Convention: action creators are allowed to fire
      // side effects.
      // Here we are saving the new draft in localforage.
      this.draftsService.getDrafts();
      return { type: 'GET_DRAFTS' }
    });

    this.dispatcher.dispatch(getDraftsAction$);
  }

  receiveDrafts(receiveDrafts$) {
    const receiveDraftsActions$ = receiveDrafts$
      .map(drafts => ({
        type: 'RECEIVE_DRAFTS',
        data: { drafts }
      }));

    this.dispatcher.dispatch(receiveDraftsActions$);
  }

  filterHearted(filterHearted$) {
    this.dispatcher.dispatch(filterHearted$
      .map(() => ({ type: 'FILTER_HEARTED' }))
    );
  }
}
