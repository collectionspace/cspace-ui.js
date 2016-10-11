import { combineReducers } from 'redux';
import panels, * as fromPanels from './panels';

export default combineReducers({
  panels,
});

export const isPanelCollapsed = (state, recordType, name) =>
  fromPanels.isCollapsed(state.panels, recordType, name);
