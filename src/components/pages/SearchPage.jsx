import React, { Component, PropTypes } from 'react';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { locationShape, routerShape } from 'react-router/lib/PropTypes';
import ErrorPage from './ErrorPage';
import SearchBuilder from '../search/SearchBuilder';
import TitleBar from '../sections/TitleBar';

import {
  getDefaultSearchRecordType,
  getDefaultSearchVocabulary,
  isAuthority,
  validateRecordType,
} from '../../helpers/configHelpers';

import styles from '../../../styles/cspace-ui/SearchPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';

const messages = defineMessages({
  title: {
    id: 'searchPage.title',
    defaultMessage: 'Search',
  },
});

const propTypes = {
  intl: intlShape,
  keywordValue: PropTypes.string,
  location: locationShape,
  params: PropTypes.objectOf(PropTypes.string),
  preferredRecordType: PropTypes.string,
  preferredVocabulary: PropTypes.string,
  router: routerShape,
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
    if (!this.normalizePath()) {
      // If the record type and/or vocab were changed via URL, commit the new value.

      const searchDescriptor = this.getSearchDescriptor();

      const {
        recordType,
        vocabulary,
      } = searchDescriptor;

      const {
        preferredRecordType,
        preferredVocabulary,
        onRecordTypeCommit,
        onVocabularyCommit,
      } = this.props;

      if (recordType !== preferredRecordType || vocabulary !== preferredVocabulary) {
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

  componentDidUpdate(prevProps) {
    if (
      this.props.params.recordType !== prevProps.params.recordType ||
      this.props.params.vocabulary !== prevProps.params.vocabulary
    ) {
      this.normalizePath();
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
      preferredRecordType,
      preferredVocabulary,
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
        recordType = preferredRecordType || getDefaultSearchRecordType(config);
      }

      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      if (isAuthority(recordTypeConfig) && !vocabulary) {
        vocabulary = preferredVocabulary || getDefaultSearchVocabulary(recordTypeConfig);
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
      intl,
      keywordValue,
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
          <SearchBuilder
            config={config}
            intl={intl}
            keywordValue={keywordValue}
            recordTypeValue={recordType}
            vocabularyValue={vocabulary}
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
