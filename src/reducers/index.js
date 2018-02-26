import { combineReducers } from 'redux';
import authz, * as fromAuthz from './authz';
import authority, * as fromAuthority from './authority';
import cspace from './cspace';
import idGenerator, * as fromIDGenerator from './idGenerator';
import searchPage, * as fromSearchPage from './searchPage';
import quickSearch, * as fromQuickSearch from './quickSearch';
import login, * as fromLogin from './login';
import logout, * as fromLogout from './logout';
import notification, * as fromNotification from './notification';
import optionList, * as fromOptionList from './optionList';
import partialTermSearch, * as fromPartialTermSearch from './partialTermSearch';
import prefs, * as fromPrefs from './prefs';
import record, * as fromRecord from './record';
import recordBrowser, * as fromRecordBrowser from './recordBrowser';
import recordPage, * as fromRecordPage from './recordPage';
import searchToRelate, * as fromSearchToRelate from './searchToRelate';
import relation, * as fromRelation from './relation';
import search, * as fromSearch from './search';
import user, * as fromUser from './user';
import vocabulary, * as fromVocabulary from './vocabulary';

export default combineReducers({
  authz,
  authority,
  cspace,
  idGenerator,
  searchPage,
  quickSearch,
  login,
  logout,
  optionList,
  notification,
  partialTermSearch,
  prefs,
  record,
  recordBrowser,
  recordPage,
  searchToRelate,
  relation,
  search,
  user,
  vocabulary,
});

export const getAuthorityVocabCsid = (state, recordType, vocab) =>
  fromAuthority.getVocabCsid(state.authority, recordType, vocab);

export const getAuthorityVocabWorkflowState = (state, recordType, vocab) =>
  fromAuthority.getVocabWorkflowState(state.authority, recordType, vocab);

export const isAuthzPermsReadPending = state => fromAuthz.isPermsReadPending(state.authz);

export const getAuthzResourceNames = state => fromAuthz.getResourceNames(state.authz);

export const isAuthzRolesReadPending = state => fromAuthz.isRolesReadPending(state.authz);

export const getAuthzRoles = state => fromAuthz.getRoles(state.authz);

export const getUserScreenName = state => fromUser.getScreenName(state.user);

export const getUserUserId = state => fromUser.getUserId(state.user);

export const getUserUsername = state => fromUser.getUsername(state.user);

export const getUserPerms = state => fromUser.getPerms(state.user);

export const getLoginUsername = state => fromLogin.getUsername(state.login);

export const isLoginPending = state => fromLogin.isPending(state.login);

export const isLoginSuccess = state => fromLogin.isSuccess(state.login);

export const getLoginError = state => fromLogin.getError(state.login);

export const isLogoutPending = state => fromLogout.isPending(state.logout);

export const getLogoutResponse = state => fromLogout.getResponse(state.logout);

export const getRecordRelationUpdatedTimestamp = (state, csid) =>
  fromRecord.getRelationUpdatedTimestamp(state.record, csid);

export const getRecordData = (state, csid) => fromRecord.getData(state.record, csid);

export const getSubrecordData = (state, csid) => fromRecord.getSubrecordData(state.record, csid);

export const getRecordError = (state, csid) => fromRecord.getError(state.record, csid);

export const getRecordSubrecordCsid = (state, csid, subrecordName) =>
  fromRecord.getSubrecordCsid(state.record, csid, subrecordName);

export const getRecordValidationErrors = (state, csid) =>
  fromRecord.getValidationErrors(state.record, csid);

export const getNewRecordData = state => fromRecord.getNewData(state.record);

export const isRecordReadPending = (state, csid) => fromRecord.isReadPending(state.record, csid);

export const isRecordSavePending = (state, csid) => fromRecord.isSavePending(state.record, csid);

export const isRecordModified = (state, csid) => fromRecord.isModified(state.record, csid);

export const getRecordPagePrimaryCsid = state => fromRecordPage.getPrimaryCsid(state.recordPage);

export const getRelatedRecordBrowserRelatedCsid = (state, recordType) =>
  fromRecordBrowser.getRelatedRecordBrowserRelatedCsid(state.recordBrowser, recordType);

export const getPrefs = state => state.prefs;

export const isPanelCollapsed = (state, recordType, name) =>
  fromPrefs.isPanelCollapsed(state.prefs, recordType, name);

export const getRecordBrowserNavBarItems = (state, recordType) =>
  fromPrefs.getRecordBrowserNavBarItems(state.prefs, recordType);

export const getSearchPanelPageSize = (state, recordType, name) =>
  fromPrefs.getSearchPanelPageSize(state.prefs, recordType, name);

export const getSearchResultPagePageSize = state =>
  fromPrefs.getSearchResultPagePageSize(state.prefs);

export const getSearchToRelatePageSize = state =>
  fromPrefs.getSearchToRelatePageSize(state.prefs);

export const getForm = (state, recordType) => fromPrefs.getForm(state.prefs, recordType);

export const getUploadType = state => fromPrefs.getUploadType(state.prefs);

export const getAdminTab = state => fromPrefs.getAdminTab(state.prefs);

export const getOptionList = (state, optionListName) =>
  fromOptionList.get(state.optionList, optionListName);

export const getVocabulary = (state, vocabularyName) =>
  fromVocabulary.get(state.vocabulary, vocabularyName);

export const getPartialTermSearchMatches = state =>
  fromPartialTermSearch.getMatches(state.partialTermSearch);

export const getIDGenerator = (state, idGeneratorName) =>
  fromIDGenerator.get(state.idGenerator, idGeneratorName);

export const getSearchPageAdvanced = state => fromSearchPage.getAdvanced(state.searchPage);

export const getSearchPageKeyword = state => fromSearchPage.getKeyword(state.searchPage);

export const getSearchPageRecordType = state => fromPrefs.getSearchPageRecordType(state.prefs);

export const getSearchPageVocabulary = (state, recordType) =>
  fromPrefs.getSearchPageVocabulary(state.prefs, recordType);

export const getQuickSearchKeyword = state => fromQuickSearch.getKeyword(state.quickSearch);

export const getQuickSearchRecordType = state => fromPrefs.getQuickSearchRecordType(state.prefs);

export const getQuickSearchVocabulary = (state, recordType) =>
  fromPrefs.getQuickSearchVocabulary(state.prefs, recordType);

export const isSearchPending = (state, searchName, searchDescriptor) =>
  fromSearch.isPending(state.search, searchName, searchDescriptor);

export const getSearchState = (state, searchName, searchDescriptor) =>
  fromSearch.getState(state.search, searchName, searchDescriptor);

export const getMostRecentSearchDescriptor = (state, searchName) =>
  fromSearch.getMostRecentDescriptor(state.search, searchName);

export const getSearchResult = (state, searchName, searchDescriptor) =>
  fromSearch.getResult(state.search, searchName, searchDescriptor);

export const getSearchError = (state, searchName, searchDescriptor) =>
  fromSearch.getError(state.search, searchName, searchDescriptor);

export const getSearchSelectedItems = (state, searchName) =>
  fromSearch.getSelectedItems(state.search, searchName);

export const getRelationFindResult = (state, subject, object, predicate) =>
  fromRelation.getFindResult(state.relation, subject, object, predicate);

export const getSearchToRelateAdvanced = state =>
  fromSearchToRelate.getAdvanced(state.searchToRelate);

export const getSearchToRelateKeyword = state =>
  fromSearchToRelate.getKeyword(state.searchToRelate);

export const getSearchToRelateRecordType = state =>
  fromSearchToRelate.getRecordType(state.searchToRelate);

export const getSearchToRelateVocabulary = (state, recordType) =>
  fromSearchToRelate.getVocabulary(state.searchToRelate, recordType);

export const getNotifications = state =>
  fromNotification.getNotifications(state.notification);

export const getOpenModalName = state =>
  fromNotification.getModal(state.notification);
