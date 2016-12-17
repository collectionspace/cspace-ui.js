import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cspace from './cspace';
import idGenerator, * as fromIDGenerator from './idGenerator';
import login, * as fromLogin from './login';
import logout, * as fromLogout from './logout';
import options, * as fromOptions from './options';
import partialTermSearch, * as fromPartialTermSearch from './partialTermSearch';
import prefs, * as fromPrefs from './prefs';
import record, * as fromRecord from './record';
import user, * as fromUser from './user';
import vocabulary, * as fromVocabulary from './vocabulary';

export default combineReducers({
  cspace,
  idGenerator,
  login,
  logout,
  options,
  partialTermSearch,
  prefs,
  record,
  routing,
  user,
  vocabulary,
});

export function getUserUsername(state) {
  return fromUser.getUsername(state.user);
}

export function getLoginContinuation(state) {
  return fromLogin.getContinuation(state.login);
}

export function getLoginUsername(state) {
  return fromLogin.getUsername(state.login);
}

export function isLoginPending(state) {
  return fromLogin.isPending(state.login);
}

export function getLoginResponse(state) {
  return fromLogin.getResponse(state.login);
}

export function getLoginError(state) {
  return fromLogin.getError(state.login);
}

export function isLogoutPending(state) {
  return fromLogout.isPending(state.logout);
}

export function getLogoutResponse(state) {
  return fromLogout.getResponse(state.logout);
}

export function getRecordData(state, csid) {
  return fromRecord.getData(state.record, csid);
}

export function getNewRecordData(state) {
  return fromRecord.getNewData(state.record);
}

export function isRecordReadPending(state, csid) {
  return fromRecord.isReadPending(state.record, csid);
}

export function isRecordSavePending(state, csid) {
  return fromRecord.isSavePending(state.record, csid);
}

export function isPanelCollapsed(state, recordType, name) {
  return fromPrefs.isPanelCollapsed(state.prefs, recordType, name);
}

export function getOptions(state, optionListName) {
  return fromOptions.get(state.options, optionListName);
}

export function getVocabulary(state, vocabularyName) {
  return fromVocabulary.get(state.vocabulary, vocabularyName);
}

export function getPartialTermSearchMatches(state) {
  return fromPartialTermSearch.getMatches(state.partialTermSearch);
}

export function getIDGenerator(state, idGeneratorName) {
  return fromIDGenerator.get(state.idGenerator, idGeneratorName);
}

