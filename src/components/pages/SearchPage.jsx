import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { locationShape, routerShape } from 'react-router/lib/PropTypes';
import ErrorPage from './ErrorPage';
import BaseSearchForm from '../search/SearchForm';
import TitleBar from '../sections/TitleBar';

import {
  getDefaultSearchRecordType,
  getDefaultSearchVocabulary,
  isAuthority,
  validateRecordType,
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
  recordTypeValue: PropTypes.string,
  vocabularyValue: PropTypes.string,
  keywordValue: PropTypes.string,
  advancedSearchCondition: PropTypes.object,
  location: locationShape,
  params: PropTypes.objectOf(PropTypes.string),
  router: routerShape,
  onAdvancedSearchConditionCommit: PropTypes.func,
  onKeywordCommit: PropTypes.func,
  onRecordTypeCommit: PropTypes.func,
  onVocabularyCommit: PropTypes.func,
  onSearch: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default class SearchPage extends Component {
  constructor() {
    super();

    this.handleRecordTypeCommit = this.handleRecordTypeCommit.bind(this);
    this.handleVocabularyCommit = this.handleVocabularyCommit.bind(this);
  }

  componentDidMount() {
    this.normalizePath();
  }

  componentDidUpdate(prevProps) {
    let historyChanged = false;

    if (
      this.props.params.recordType !== prevProps.params.recordType ||
      this.props.params.vocabulary !== prevProps.params.vocabulary
    ) {
      historyChanged = this.normalizePath();
    }

    if (!historyChanged) {
      // If the record type and/or vocab were changed via URL or by the selection of a default,
      // commit the new values.

      const searchDescriptor = this.getSearchDescriptor();

      const {
        recordType,
        vocabulary,
      } = searchDescriptor;

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

  getSearchDescriptor() {
    const {
      params,
    } = this.props;

    const searchDescriptor = {};

    ['recordType', 'vocabulary'].forEach((param) => {
      const value = params[param];

      if (typeof value !== 'undefined') {
        searchDescriptor[param] = value;
      }
    });

    return searchDescriptor;
  }

  normalizePath() {
    const {
      recordTypeValue,
      vocabularyValue,
      location,
      params,
      router,
    } = this.props;

    const {
      config,
    } = this.context;

    if (router) {
      let {
        recordType,
        vocabulary,
      } = params;

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
        router.replace({
          pathname: normalizedPath,
        });

        return true;
      }
    }

    return false;
  }

  handleRecordTypeCommit(value) {
    const {
      router,
      onRecordTypeCommit,
    } = this.props;

    if (onRecordTypeCommit) {
      onRecordTypeCommit(value);
    }

    router.replace({
      pathname: `/search/${value}`,
    });
  }

  handleVocabularyCommit(value) {
    const {
      router,
      onVocabularyCommit,
    } = this.props;

    if (onVocabularyCommit) {
      onVocabularyCommit(value);
    }

    const searchDescriptor = this.getSearchDescriptor();

    const {
      recordType,
    } = searchDescriptor;

    router.replace({
      pathname: `/search/${recordType}/${value}`,
    });
  }

  render() {
    const {
      advancedSearchCondition,
      keywordValue,
      onAdvancedSearchConditionCommit,
      onKeywordCommit,
      onSearch,
    } = this.props;

    const {
      config,
    } = this.context;

    const searchDescriptor = this.getSearchDescriptor();

    const {
      recordType,
      vocabulary,
    } = searchDescriptor;

    const validation = validateRecordType(config, recordType, vocabulary);

    if (validation.error) {
      return (
        <ErrorPage error={validation.error} />
      );
    }

    const title = <FormattedMessage {...messages.title} />;

    return (
      <div className={styles.common}>
        <TitleBar title={title} />
        <div className={pageBodyStyles.common}>
          <SearchForm
            advancedSearchCondition={advancedSearchCondition}
            config={config}
            keywordValue={keywordValue}
            recordTypeValue={recordType}
            vocabularyValue={vocabulary}
            onAdvancedSearchConditionCommit={onAdvancedSearchConditionCommit}
            onKeywordCommit={onKeywordCommit}
            onRecordTypeCommit={this.handleRecordTypeCommit}
            onVocabularyCommit={this.handleVocabularyCommit}
            onSearch={onSearch}
          />
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.contextTypes = contextTypes;
