export const reducers = {
  deleteDraft(action, state) {
    return state.filter(draft => draft.id !== action.data);
  },

  addDraft(action, state) {
    return [{ id: action.data.id, text: action.data.text }, ...state];
  },

  receiveDrafts(action, state) {
    return [...action.data];
  },

  draftsSaved(action, state) {
    return state;
  },

  flagDraft(action, state) {
    return state
      .map(draft => {
        if (draft.id === action.data) {
          draft.flagged = !draft.flagged;
        }
        return draft;
      });
  },

  filterFlagged(action, state) {
    return state
      .map(draft => {
        if (!draft.flagged) {
          draft.hide = !draft.hide;
        }
        return draft;
      });
  }
};
