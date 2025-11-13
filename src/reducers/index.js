import { combineReducers } from 'redux';
import authz, * as fromAuthz from './authz';
import authority, * as fromAuthority from './authority';
import cspace, * as fromCspace from './cspace';
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
import searchToSelect, * as fromSearchToSelect from './searchToSelect';
import relation, * as fromRelation from './relation';
import search, * as fromSearch from './search';
import tags, * as fromTags from './tags';
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
  searchToSelect,
  relation,
  search,
  tags,
  user,
  vocabulary,
});

export const getAuthorityVocabCsid = (state, recordType, vocab) => (
  fromAuthority.getVocabCsid(state.authority, recordType, vocab)
);

export const getAuthorityVocabWorkflowState = (state, recordType, vocab) => (
  fromAuthority.getVocabWorkflowState(state.authority, recordType, vocab)
);

export const isAuthzPermsReadPending = (state) => fromAuthz.isPermsReadPending(state.authz);

export const getAuthzResourceNames = (state) => fromAuthz.getResourceNames(state.authz);

export const isAuthzRolesReadPending = (state) => fromAuthz.isRolesReadPending(state.authz);

export const getAuthzRoles = (state) => fromAuthz.getRoles(state.authz);

export const areUserPrefsLoaded = (state) => fromUser.arePrefsLoaded(state.user);

export const getUserAccountId = (state) => fromUser.getAccountId(state.user);

export const getUserScreenName = (state) => fromUser.getScreenName(state.user);

export const getUserUserId = (state) => fromUser.getUserId(state.user);

export const getUserUsername = (state) => fromUser.getUsername(state.user);

export const getUserPerms = (state) => fromUser.getPerms(state.user);

export const getUserRoleNames = (state) => fromUser.getRoleNames(state.user);

export const getLoginAuthCodeUrl = (state) => fromLogin.getAuthCodeUrl(state.login);

export const getLoginLandingPath = (state) => fromLogin.getLandingPath(state.login);

export const getLoginUsername = (state) => fromLogin.getUsername(state.login);

export const isLoginPending = (state) => fromLogin.isPending(state.login);

export const isLoginSuccess = (state) => fromLogin.isSuccess(state.login);

export const getLoginError = (state) => fromLogin.getError(state.login);

export const isLoginWindowOpen = (state) => fromLogin.isWindowOpen(state.login);

export const isLoginWindowOpenFailed = (state) => fromLogin.isWindowOpenFailed(state.login);

export const isLogoutPending = (state) => fromLogout.isPending(state.logout);

export const getLogoutResponse = (state) => fromLogout.getResponse(state.logout);

export const getRecordRelationUpdatedTimestamp = (state, csid) => (
  fromRecord.getRelationUpdatedTimestamp(state.record, csid)
);

export const getRecordData = (state, csid) => fromRecord.getData(state.record, csid);

export const getSubrecordData = (state, csid) => fromRecord.getSubrecordData(state.record, csid);

export const getRecordError = (state, csid) => fromRecord.getError(state.record, csid);

export const getRecordSubrecordCsid = (state, csid, subrecordName) => (
  fromRecord.getSubrecordCsid(state.record, csid, subrecordName)
);

export const getRecordValidationErrors = (state, csid) => (
  fromRecord.getValidationErrors(state.record, csid)
);

export const getNewRecordData = (state) => fromRecord.getNewData(state.record);

export const isRecordReadPending = (state, csid) => fromRecord.isReadPending(state.record, csid);

export const isRecordSavePending = (state, csid) => fromRecord.isSavePending(state.record, csid);

export const isRecordReadVocabularyItemRefsPending = (state, csid) => (
  fromRecord.isReadVocabularyItemRefsPending(state.record, csid)
);

export const isRecordModified = (state, csid) => fromRecord.isModified(state.record, csid);

export const isRecordModifiedExceptPart = (state, csid, part) => (
  fromRecord.isModifiedExceptPart(state.record, csid, part)
);

export const getRecordPagePrimaryCsid = (state) => fromRecordPage.getPrimaryCsid(state.recordPage);

export const getRelatedRecordBrowserRelatedCsid = (state, recordType) => (
  fromRecordBrowser.getRelatedRecordBrowserRelatedCsid(state.recordBrowser, recordType)
);

export const getPrefs = (state) => state.prefs;

export const getAdvancedSearchBooleanOp = (state) => (
  fromPrefs.getAdvancedSearchBooleanOp(state.prefs)
);

export const getAdvancedSearchNewBooleanOp = (state, searchTermsGroup) => (
  fromPrefs.getAdvancedSearchNewBooleanOp(state.prefs, searchTermsGroup)
);

export const getSearchNewCondition = (state, recordType, searchTermsGroup) => (
  fromPrefs.getSearchNewCondition(state.prefs, recordType, searchTermsGroup)
);

export const isPanelCollapsed = (state, recordType, name) => (
  fromPrefs.isPanelCollapsed(state.prefs, recordType, name)
);

export const getRecordBrowserNavBarItems = (state, recordType) => (
  fromPrefs.getRecordBrowserNavBarItems(state.prefs, recordType)
);

export const getSearchPanelPageSize = (state, recordType, name) => (
  fromPrefs.getSearchPanelPageSize(state.prefs, recordType, name)
);

export const getSearchResultPagePageSize = (state) => (
  fromPrefs.getSearchResultPagePageSize(state.prefs)
);

export const getSearchToSelectPageSize = (state) => (
  fromPrefs.getSearchToSelectPageSize(state.prefs)
);

export const getForm = (state, recordType) => fromPrefs.getForm(state.prefs, recordType);

export const getUploadType = (state) => fromPrefs.getUploadType(state.prefs);

export const getAdminTab = (state) => fromPrefs.getAdminTab(state.prefs);

export const getToolTab = (state) => fromPrefs.getToolTab(state.prefs);

export const getNewSearchShown = (state) => fromPrefs.getNewSearchShown(state.prefs);

export const getUseNewSearch = (state) => fromPrefs.getUseNewSearch(state.prefs);

export const getOptionList = (state, optionListName) => (
  fromOptionList.get(state.optionList, optionListName)
);

export const getVocabulary = (state, vocabularyName) => (
  fromVocabulary.get(state.vocabulary, vocabularyName)
);

export const getPartialTermSearchMatches = (state) => (
  fromPartialTermSearch.getMatches(state.partialTermSearch)
);

export const getIDGenerator = (state, idGeneratorName) => (
  fromIDGenerator.get(state.idGenerator, idGeneratorName)
);

export const getSearchPageAdvanced = (state) => fromSearchPage.getAdvanced(state.searchPage);
export const getSearchPageAdvancedLimitBy = (state) => (
  fromSearchPage.getAdvancedLimitBy(state.searchPage)
);
export const getSearchPageAdvancedSearchTerms = (state) => (
  fromSearchPage.getAdvancedSearchTerms(state.searchPage)
);

export const getSearchPageKeyword = (state) => fromSearchPage.getKeyword(state.searchPage);

export const getSearchCondition = (state, recordType) => (
  fromPrefs.getSearchCondition(state.prefs, recordType)
);

export const getSearchPageRecordType = (state) => fromPrefs.getSearchPageRecordType(state.prefs);

export const getSearchPageVocabulary = (state, recordType) => (
  fromPrefs.getSearchPageVocabulary(state.prefs, recordType)
);

export const getQuickSearchKeyword = (state) => fromQuickSearch.getKeyword(state.quickSearch);

export const getQuickSearchRecordType = (state) => fromPrefs.getQuickSearchRecordType(state.prefs);

export const getQuickSearchVocabulary = (state, recordType) => (
  fromPrefs.getQuickSearchVocabulary(state.prefs, recordType)
);

export const isRecordSidebarOpen = (state) => fromPrefs.isRecordSidebarOpen(state.prefs);

export const isSearchResultSidebarOpen = (state) => (
  fromPrefs.isSearchResultSidebarOpen(state.prefs)
);

export const getStickyFields = (state, recordType) => (
  fromPrefs.getStickyFields(state.prefs, recordType)
);

export const isSearchDirty = (state, searchName) => fromSearch.isDirty(state.search, searchName);

export const isSearchPending = (state, searchName, searchDescriptor) => (
  fromSearch.isPending(state.search, searchName, searchDescriptor)
);

export const getSearchState = (state, searchName, searchDescriptor) => (
  fromSearch.getState(state.search, searchName, searchDescriptor)
);

export const getMostRecentSearchDescriptor = (state, searchName) => (
  fromSearch.getMostRecentDescriptor(state.search, searchName)
);

export const getSearchResult = (state, searchName, searchDescriptor) => (
  fromSearch.getResult(state.search, searchName, searchDescriptor)
);

export const getSearchError = (state, searchName, searchDescriptor) => (
  fromSearch.getError(state.search, searchName, searchDescriptor)
);

export const getSearchSelectedItems = (state, searchName) => (
  fromSearch.getSelectedItems(state.search, searchName)
);

export const getRelationFindResult = (state, subject, object, predicate) => (
  fromRelation.getFindResult(state.relation, subject, object, predicate)
);

export const getSearchToSelectAdvanced = (state) => (
  fromSearchToSelect.getAdvanced(state.searchToSelect)
);

export const getSearchToSelectKeyword = (state) => (
  fromSearchToSelect.getKeyword(state.searchToSelect)
);

export const getSearchToSelectRecordType = (state) => (
  fromSearchToSelect.getRecordType(state.searchToSelect)
);

export const getSearchToSelectVocabulary = (state, recordType) => (
  fromSearchToSelect.getVocabulary(state.searchToSelect, recordType)
);

export const getNotifications = (state) => fromNotification.getNotifications(state.notification);

export const getOpenModalName = (state) => fromNotification.getModal(state.notification);

export const getCSpaceSystemInfo = (state) => fromCspace.getSystemInfo(state.cspace);

export const getTagsForRecord = (state, recordType) => fromTags.getTags(state.tags, recordType);
