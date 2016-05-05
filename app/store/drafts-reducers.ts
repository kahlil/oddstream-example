export const draftsReducers = {
  deleteDraft: (action, state) => state
    .filter(draft => draft.id !== action.data),

  receiveDrafts: (action, state) => [...action.data],

  draftsSaved: (action, state) => [...state],

  flagDraft: (action, state) => state
    .map(draft => {
      if (draft.id === action.data) {
        draft.flagged = !draft.flagged;
      }
      return draft;
    }),

  filterFlagged: (action, state) => state
    .map(draft => {
      if (!draft.flagged) {
        draft.hide = !draft.hide;
      }
      return draft;
    }),
};
