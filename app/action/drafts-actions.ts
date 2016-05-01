import { DraftsService } from '../service/drafts';

export function draftsActions(draftsService: DraftsService) {
  return {
    openEditor: data => ({
      type: 'OPEN_EDITOR',
      data
    }),

    deleteDraft: id => {
      // FIRE SIDE EFFECT!
      draftsService.deleteDraft(id);
      return {
        type: 'DELETE_DRAFT',
        data: id
      };
    },

    flagDraft: id => {
      // FIRE SIDE EFFECT!
      draftsService.flagDraft(id);
      return {
        type: 'FLAG_DRAFT',
        data: id
      };
    },

    addDraft: draft => {
      // Convention: action creators are allowed to fire
      // side effects.
      // Here we are saving the new draft in localforage.
      draftsService.saveDraft(draft);
      return {
        type: 'ADD_DRAFT',
        data: draft
      };
    },

    getDrafts: action => {
      // Convention: action creators are allowed to fire
      // side effects.
      // Here we are saving the new draft in localforage.
      draftsService.getDrafts();
      return { type: 'GET_DRAFTS' };
    },

    receiveDrafts: drafts => ({
      type: 'RECEIVE_DRAFTS',
      data: { drafts }
    }),

    filterFlagged: () => ({ type: 'FILTER_FLAGGED' })
  };
}
