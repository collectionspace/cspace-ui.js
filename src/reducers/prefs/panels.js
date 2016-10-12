import {
  COLLAPSE_PANEL,
} from '../../actions/prefs';

const collapse = (state, action) => {
  const {
    recordType,
    name,
  } = action.meta;

  const recordTypePanelStates = state[recordType];

  const updatedRecordTypePanelStates = Object.assign({}, recordTypePanelStates, {
    [name]: action.payload,
  });

  return Object.assign({}, state, {
    [recordType]: updatedRecordTypePanelStates,
  });
};

export default (state = {}, action) => {
  switch (action.type) {
    case COLLAPSE_PANEL:
      return collapse(state, action);
    default:
      return state;
  }
};

export const isCollapsed = (state, recordType, name) => {
  if (!state) {
    return undefined;
  }

  const recordTypePanelStates = state[recordType];

  if (!recordTypePanelStates) {
    return undefined;
  }

  return recordTypePanelStates[name];
};
