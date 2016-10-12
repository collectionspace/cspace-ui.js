export const COLLAPSE_PANEL = 'COLLAPSE_PANEL';

// TODO: Store prefs in user profile/local storage.

export const collapsePanel = (recordType, name, collapsed) => ({
  type: COLLAPSE_PANEL,
  payload: collapsed,
  meta: {
    recordType,
    name,
  },
});
