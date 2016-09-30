import { combineReducers } from 'redux';

import {
  COLLAPSE_PANEL,
} from '../actions';

const collapsePanel = (state, action) => {
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

const panels = (state = {}, action) => {
  switch (action.type) {
    case COLLAPSE_PANEL:
      return collapsePanel(state, action);
    default:
      return state;
  }
};

export default combineReducers({
  panels,
});

export function isPanelCollapsed(store, recordType, name) {
  if (!(store && store.panels)) {
    return undefined;
  }

  const recordTypePanels = store.panels[recordType];

  if (!recordTypePanels) {
    return undefined;
  }

  return recordTypePanels[name];
}
