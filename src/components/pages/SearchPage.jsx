import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import Immutable from 'immutable';
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

const SearchForm = injectIntl(BaseSearchForm);

const messages = defineMessages({
  title: {
    id: 'searchPage.title',
    defaultMessage: 'Search',
  },
});

const propTypes = {
  config: PropTypes.object,
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  keywordValue: PropTypes.string,
  advancedSearchCondition: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  preferredAdvancedSearchBooleanOp: PropTypes.string,
  getAuthorityVocabCsid: PropTypes.func,
  buildRecordFieldOptionLists: PropTypes.func,
  clearSearchPage: PropTypes.func,
  deleteOptionList: PropTypes.func,
  initiateSearch: PropTypes.func,
  onAdvancedSearchConditionCommit: PropTypes.func,
  onClearButtonClick: PropTypes.func,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default class SearchPage extends Component {
  constructor() {
    super();

    this.handleRecordTypeCommit = this.handleRecordTypeCommit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleVocabularyCommit = this.handleVocabularyCommit.bind(this);
    this.handleTitleBarDocked = this.handleTitleBarDocked.bind(this);

    this.state = ({
      headerDockPosition: null,
    });
  }

  componentDidMount() {
    this.normalizePath();
  }

  componentDidUpdate(prevProps) {
    let historyChanged = false;

    const { params } = this.props.match;
    const { params: prevParams } = prevProps.match;

    if (
      params.recordType !== prevParams.recordType ||
      params.vocabulary !== prevParams.vocabulary
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

  getSearchDescriptor() {
    const {
      params,
    } = this.props.match;

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

  render() {
    const {
      advancedSearchCondition,
      keywordValue,
      perms,
      preferredAdvancedSearchBooleanOp,
      getAuthorityVocabCsid,
      buildRecordFieldOptionLists,
      deleteOptionList,
      onAdvancedSearchConditionCommit,
      onClearButtonClick,
      onKeywordCommit,
    } = this.props;

    const {
      headerDockPosition,
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

    return (
      <div className={styles.common}>
        <TitleBar
          title={title}
          updateDocumentTitle
          onDocked={this.handleTitleBarDocked}
        />

        <div className={pageBodyStyles.common}>
          <SearchForm
            advancedSearchCondition={advancedSearchCondition}
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
            onAdvancedSearchConditionCommit={onAdvancedSearchConditionCommit}
            onClearButtonClick={onClearButtonClick}
            onKeywordCommit={onKeywordCommit}
            onRecordTypeCommit={this.handleRecordTypeCommit}
            onVocabularyCommit={this.handleVocabularyCommit}
            onSearch={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.contextTypes = contextTypes;
