import { combineReducers } from 'redux';
import data, * as fromData from './data';
import readsPending, * as fromReadsPending from './readsPending';
import savesPending, * as fromSavesPending from './savesPending';

export default combineReducers({
  data,
  savesPending,
  readsPending,
});

export const getData = (state, csid) => fromData.get(state.data, csid);

export const getNewData = state => fromData.getNew(state.data);

export const isReadPending = (state, csid) => fromReadsPending.get(state.readsPending, csid);

export const isSavePending = (state, csid) => fromSavesPending.get(state.savesPending, csid);
