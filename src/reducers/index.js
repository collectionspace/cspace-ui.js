import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cspace from './cspace';
import idGenerator, * as fromIDGenerator from './idGenerator';
import keywordSearch, * as fromKeywordSearch from './keywordSearch';
import login, * as fromLogin from './login';
import logout, * as fromLogout from './logout';
import optionList, * as fromOptionList from './optionList';
import partialTermSearch, * as fromPartialTermSearch from './partialTermSearch';
import prefs, * as fromPrefs from './prefs';
import record, * as fromRecord from './record';
import search, * as fromSearch from './search';
import user, * as fromUser from './user';
import vocabulary, * as fromVocabulary from './vocabulary';

export default combineReducers({
  cspace,
  idGenerator,
  keywordSearch,
  login,
  logout,
  optionList,
  partialTermSearch,
  prefs,
  record,
  routing,
  search,
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

export function getOptionList(state, optionListName) {
  return fromOptionList.get(state.optionList, optionListName);
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

export function getKeywordSearchKeyword(state) {
  return fromKeywordSearch.getKeyword(state.keywordSearch);
}

export function getKeywordSearchRecordType(state) {
  return fromKeywordSearch.getRecordType(state.keywordSearch);
}

export function getKeywordSearchVocabulary(state) {
  return fromKeywordSearch.getVocabulary(state.keywordSearch);
}

export function isSearchPending(state) {
  return fromSearch.isPending(state.search);
}

export function getSearchResult(state) {
  return fromSearch.getResult(state.search);
}

export function getSearchError(state) {
  return fromSearch.getError(state.search);
}
