export const draftsEditorReducers = {
  openEditor: (action, state) => ({ isEnabled: true }),
  addDraft: (action, state) => ({ isEnabled: false })
};
