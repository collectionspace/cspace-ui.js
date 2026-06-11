import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages, injectIntl, FormattedMessage, intlShape,
} from 'react-intl';
import get from 'lodash/get';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import ErrorPage from './ErrorPage';
import BaseSearchForm from '../search/SearchForm';
import TitleBar from '../sections/TitleBar';

import {
  getDefaultSearchRecordType,
  getDefaultSearchVocabulary,
  isAuthority,
  validateLocation,
} from '../../helpers/configHelpers';

import styles from '../../../styles/cspace-ui/SearchPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';
import SaveQueryModalContainer from '../../containers/search/SaveQueryModalContainer';
import SavedQueriesModalContainer from '../../containers/search/SavedQueriesModalContainer';

const { Button } = inputComponents;

const SearchForm = injectIntl(BaseSearchForm);

const messages = defineMessages({
  title: {
    id: 'searchPage.title',
    defaultMessage: 'Search',
  },
  toggleButtonOldSearch: {
    id: 'searchPage.toggleButtonOldSearch',
    defaultMessage: 'Revert to Classic Search',
  },
  toggleButtonNewSearch: {
    id: 'searchPage.toggleButtonNewSearch',
    defaultMessage: 'Return to New Search',
  },
  provideFeedback: {
    id: 'searchPage.provideFeedback',
    defaultMessage: 'Provide feedback',
  },
});

const propTypes = {
  // FIXME: Why is config both a prop and in context?
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  keywordValue: PropTypes.string,
  useNewSearch: PropTypes.bool,
  advancedSearchCondition: PropTypes.instanceOf(Immutable.Map),
  advancedSearchConditionLimitBy: PropTypes.instanceOf(Immutable.Map),
  advancedSearchConditionSearchTerms: PropTypes.instanceOf(Immutable.Map),
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  perms: PropTypes.instanceOf(Immutable.Map),
  preferredAdvancedSearchBooleanOp: PropTypes.string,
  getAuthorityVocabCsid: PropTypes.func,
  buildRecordFieldOptionLists: PropTypes.func,
  clearSearchPage: PropTypes.func,
  deleteOptionList: PropTypes.func,
  initiateSearch: PropTypes.func,
  loadSavedSearchQuery: PropTypes.func,
  onAdvancedSearchConditionCommit: PropTypes.func,
  onAdvancedSearchConditionLimitByCommit: PropTypes.func,
  onAdvancedSearchConditionSearchTermsCommit: PropTypes.func,
  onClearButtonClick: PropTypes.func,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
  toggleUseNewSearch: PropTypes.func,
  intl: intlShape,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

class SearchPage extends Component {
  constructor() {
    super();

    this.handleRecordTypeCommit = this.handleRecordTypeCommit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVocabularyCommit = this.handleVocabularyCommit.bind(this);
    this.handleTitleBarDocked = this.handleTitleBarDocked.bind(this);
    this.handleToggleSearch = this.handleToggleSearch.bind(this);

    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleSaveQueryModalClose = this.handleSaveQueryModalClose.bind(this);
    this.handleSavedQueriesButtonClick = this.handleSavedQueriesButtonClick.bind(this);
    this.handleSavedQueriesModalClose = this.handleSavedQueriesModalClose.bind(this);
    this.handleLoadQuery = this.handleLoadQuery.bind(this);

    this.state = ({
      headerDockPosition: null,
      isSaveQueryModalOpen: false,
      isSavedQueriesModalOpen: false,
    });
  }

  componentDidMount() {
    this.normalizePath();
  }

  componentDidUpdate(prevProps) {
    let historyChanged = false;

    const {
      match,
    } = this.props;

    const { params } = match;
    const { params: prevParams } = prevProps.match;

    if (
      params.recordType !== prevParams.recordType
      || params.vocabulary !== prevParams.vocabulary
    ) {
      historyChanged = this.normalizePath();
    }

    if (!historyChanged) {
      // If the record type and/or vocab were changed via URL or by the selection of a default,
      // commit the new values.

      const searchDescriptor = this.getSearchDescriptor();
      const recordType = searchDescriptor.get('recordType');
      const vocabulary = searchDescriptor.get('vocabulary');

      const {
        recordTypeValue,
        vocabularyValue,
        onRecordTypeCommit,
        onVocabularyCommit,
      } = this.props;

      if (recordType !== recordTypeValue || vocabulary !== vocabularyValue) {
        if (onRecordTypeCommit) {
          onRecordTypeCommit(recordType);
        }

        if (onVocabularyCommit) {
          const { config } = this.context;
          const recordTypeConfig = get(config, ['recordTypes', recordType]);

          if (isAuthority(recordTypeConfig)) {
            onVocabularyCommit(vocabulary);
          }
        }
      }
    }
  }

  componentWillUnmount() {
    const {
      clearSearchPage,
    } = this.props;

    if (clearSearchPage) {
      clearSearchPage();
    }
  }

  handleToggleSearch() {
    const { toggleUseNewSearch } = this.props;
    toggleUseNewSearch();
  }

  handleRecordTypeCommit(value) {
    const {
      history,
      onRecordTypeCommit,
    } = this.props;

    if (onRecordTypeCommit) {
      onRecordTypeCommit(value);
    }

    history.replace({
      pathname: `/search/${value}`,
    });
  }

  handleSearch() {
    const {
      config,
      history,
      initiateSearch,
    } = this.props;

    if (initiateSearch) {
      initiateSearch(config, history.push);
    }
  }

  handleTitleBarDocked(height) {
    this.setState({
      headerDockPosition: height,
    });
  }

  handleVocabularyCommit(value) {
    const {
      history,
      onVocabularyCommit,
    } = this.props;

    if (onVocabularyCommit) {
      onVocabularyCommit(value);
    }

    const searchDescriptor = this.getSearchDescriptor();
    const recordType = searchDescriptor.get('recordType');

    history.replace({
      pathname: `/search/${recordType}/${value}`,
    });
  }

  handleSaveButtonClick() {
    this.setState({
      isSaveQueryModalOpen: true,
    });
  }

  handleSaveQueryModalClose() {
    this.setState({
      isSaveQueryModalOpen: false,
    });
  }

  handleSavedQueriesButtonClick() {
    this.setState({
      isSavedQueriesModalOpen: true,
    });
  }

  handleSavedQueriesModalClose() {
    this.setState({
      isSavedQueriesModalOpen: false,
    });
  }

  handleLoadQuery(query) {
    const {
      history,
      loadSavedSearchQuery,
    } = this.props;

    if (loadSavedSearchQuery) {
      // Set the search page state before replacing the URL, so that the URL sync in
      // componentDidUpdate sees them in agreement.
      loadSavedSearchQuery(query);
    }

    const recordType = query.get('recordType');
    const vocabulary = query.get('vocabulary');
    const vocabularyPath = vocabulary ? `/${vocabulary}` : '';

    history.replace({
      pathname: `/search/${recordType}${vocabularyPath}`,
    });

    this.setState({
      isSavedQueriesModalOpen: false,
    });
  }

  getSearchDescriptor() {
    const {
      match,
    } = this.props;

    const {
      params,
    } = match;

    const searchDescriptor = {};

    ['recordType', 'vocabulary'].forEach((param) => {
      const value = params[param];

      if (typeof value !== 'undefined') {
        searchDescriptor[param] = value;
      }
    });

    return Immutable.fromJS(searchDescriptor);
  }

  normalizePath() {
    const {
      recordTypeValue,
      vocabularyValue,
      history,
      location,
      match,
    } = this.props;

    const {
      config,
    } = this.context;

    if (history) {
      let {
        recordType,
        vocabulary,
      } = match.params;

      if (!recordType) {
        recordType = recordTypeValue || getDefaultSearchRecordType(config);
      }

      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      if (isAuthority(recordTypeConfig) && !vocabulary) {
        vocabulary = vocabularyValue || getDefaultSearchVocabulary(recordTypeConfig);
      }

      const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
      const normalizedPath = `/search/${recordType}${vocabularyPath}`;

      if (normalizedPath !== location.pathname) {
        history.replace({
          pathname: normalizedPath,
        });

        return true;
      }
    }

    return false;
  }

  render() {
    const {
      advancedSearchCondition,
      advancedSearchConditionLimitBy,
      advancedSearchConditionSearchTerms,
      keywordValue,
      perms,
      preferredAdvancedSearchBooleanOp,
      getAuthorityVocabCsid,
      buildRecordFieldOptionLists,
      deleteOptionList,
      onAdvancedSearchConditionCommit,
      onAdvancedSearchConditionLimitByCommit,
      onAdvancedSearchConditionSearchTermsCommit,
      onClearButtonClick,
      onKeywordCommit,
      useNewSearch,
      intl,
    } = this.props;

    const {
      headerDockPosition,
      isSaveQueryModalOpen,
      isSavedQueriesModalOpen,
    } = this.state;

    const {
      config,
    } = this.context;

    const searchDescriptor = this.getSearchDescriptor();
    const recordType = searchDescriptor.get('recordType');
    const vocabulary = searchDescriptor.get('vocabulary');

    const validation = validateLocation(config, { recordType, vocabulary });

    if (validation.error) {
      return (
        <ErrorPage error={validation.error} />
      );
    }

    const title = <FormattedMessage {...messages.title} />;

    // TODO: mailto address needs to be specified
    const toggleButton = (
      <div className={styles.toggleButton}>
        <Button onClick={this.handleToggleSearch}>
          {useNewSearch || typeof useNewSearch === 'undefined'
            ? intl.formatMessage(messages.toggleButtonOldSearch)
            : intl.formatMessage(messages.toggleButtonNewSearch)}
        </Button>
        <a href="https://collectionspace.org/contact/" target="_blank" rel="noreferrer">
          { intl.formatMessage(messages.provideFeedback) }
        </a>
      </div>
    );

    return (
      <div className={styles.common}>
        <TitleBar
          title={title}
          aside={toggleButton}
          isAsidePlainText
          updateDocumentTitle
          onDocked={this.handleTitleBarDocked}
        />
        <div className={pageBodyStyles.common}>
          <SearchForm
            advancedSearchCondition={advancedSearchCondition}
            advancedSearchConditionLimitBy={advancedSearchConditionLimitBy}
            advancedSearchConditionSearchTerms={advancedSearchConditionSearchTerms}
            config={config}
            dockTop={headerDockPosition}
            keywordValue={keywordValue}
            recordTypeValue={recordType}
            vocabularyValue={vocabulary}
            perms={perms}
            preferredAdvancedSearchBooleanOp={preferredAdvancedSearchBooleanOp}
            showButtons
            getAuthorityVocabCsid={getAuthorityVocabCsid}
            buildRecordFieldOptionLists={buildRecordFieldOptionLists}
            deleteOptionList={deleteOptionList}
            showNewSearch={useNewSearch || typeof useNewSearch === 'undefined'}
            onAdvancedSearchConditionCommit={onAdvancedSearchConditionCommit}
            onAdvancedSearchConditionLimitByCommit={onAdvancedSearchConditionLimitByCommit}
            onAdvancedSearchConditionSearchTermsCommit={onAdvancedSearchConditionSearchTermsCommit}
            onClearButtonClick={onClearButtonClick}
            onSaveButtonClick={this.handleSaveButtonClick}
            onSavedQueriesButtonClick={this.handleSavedQueriesButtonClick}
            onKeywordCommit={onKeywordCommit}
            onRecordTypeCommit={this.handleRecordTypeCommit}
            onVocabularyCommit={this.handleVocabularyCommit}
            onSearch={this.handleSearch}
          />
          <SaveQueryModalContainer
            isOpen={isSaveQueryModalOpen}
            onQuerySaved={this.handleSaveQueryModalClose}
            onCancelButtonClick={this.handleSaveQueryModalClose}
            onCloseButtonClick={this.handleSaveQueryModalClose}
          />
          <SavedQueriesModalContainer
            config={config}
            isOpen={isSavedQueriesModalOpen}
            onLoadQuery={this.handleLoadQuery}
            onCloseButtonClick={this.handleSavedQueriesModalClose}
          />
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.contextTypes = contextTypes;

export default injectIntl(SearchPage);
