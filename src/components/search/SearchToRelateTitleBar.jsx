import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import Immutable from 'immutable';
import AdvancedSearchBuilder from './AdvancedSearchBuilder';
import styles from '../../../styles/cspace-ui/SearchToRelateTitleBar.css';
import subtitleStyles from '../../../styles/cspace-ui/Subtitle.css';

const messages = defineMessages({
  title: {
    id: 'searchToRelateTitleBar.title',
    defaultMessage: 'Relate {collectionName} {query}',
  },
  keyword: {
    id: 'searchToRelateTitleBar.keyword',
    defaultMessage: 'containing {keyword}',
  },
});

const propTypes = {
  config: PropTypes.object,
  isSearchInitiated: PropTypes.bool,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
};

export default function SearchToRelateTitleBar(props) {
  const {
    config,
    isSearchInitiated,
    searchDescriptor,
  } = props;

  let collectionName;

  if (!isSearchInitiated) {
    const {
      recordType,
      vocabulary,
    } = props;

    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    if (!recordTypeConfig) {
      return null;
    }

    const vocabularyConfig = vocabulary ? get(recordTypeConfig, ['vocabularies', vocabulary]) : undefined;

    if (vocabularyConfig) {
      collectionName = (
        <FormattedMessage
          {...vocabularyConfig.messages.collectionName}
        />
      );
    } else {
      collectionName = (
        <FormattedMessage
          {...recordTypeConfig.messages.record.collectionName}
        />
      );
    }

    return (
      <header className={styles.common}>
        <h1><FormattedMessage {...messages.title} values={{ collectionName, query: '' }} /></h1>
      </header>
    );
  }

  const recordType = searchDescriptor.get('recordType');
  const vocabulary = searchDescriptor.get('vocabulary');

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const vocabularyConfig = vocabulary ? get(recordTypeConfig, ['vocabularies', vocabulary]) : undefined;

  const searchQuery = searchDescriptor.get('searchQuery');
  const advancedSearchCondition = searchQuery.get('as');
  const kw = searchQuery.get('kw');

  const queryTitle = kw
    ? <FormattedMessage {...messages.keyword} values={{ keyword: kw }} />
    : null;

  if (vocabularyConfig) {
    collectionName = (
      <FormattedMessage
        {...vocabularyConfig.messages.collectionName}
      />
    );
  } else {
    collectionName = (
      <FormattedMessage
        {...recordTypeConfig.messages.record.collectionName}
      />
    );
  }

  let subtitle;

  if (advancedSearchCondition) {
    subtitle = (
      <div className={subtitleStyles.common}>
        <AdvancedSearchBuilder
          condition={advancedSearchCondition}
          config={config}
          inline
          readOnly
          recordType={recordType}
        />
      </div>
    );
  }

  return (
    <header className={styles.common}>
      <h1>
        <FormattedMessage {...messages.title} values={{ collectionName, query: queryTitle }} />
      </h1>
      {subtitle}
    </header>
  );
}

SearchToRelateTitleBar.propTypes = propTypes;
