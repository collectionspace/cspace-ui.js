import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import Immutable from 'immutable';
import AdvancedSearchBuilder from './AdvancedSearchBuilder';
import styles from '../../../styles/cspace-ui/SearchToSelectTitleBar.css';
import subtitleStyles from '../../../styles/cspace-ui/Subtitle.css';

const messages = defineMessages({
  title: {
    id: 'searchToSelectTitleBar.title',
    defaultMessage: 'Select {typeName} {query}',
  },
  keyword: {
    id: 'searchToSelectTitleBar.keyword',
    defaultMessage: 'containing "{keyword}"',
  },
});

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  isSearchInitiated: PropTypes.bool,
  titleMessage: PropTypes.objectOf(PropTypes.string),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  singleSelect: PropTypes.bool,
};

const defaultProps = {
  titleMessage: messages.title,
};

export default function SearchToSelectTitleBar(props) {
  const {
    config,
    isSearchInitiated,
    searchDescriptor,
    singleSelect,
    titleMessage,
  } = props;

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

    const nameMessages = vocabularyConfig
      ? vocabularyConfig.messages
      : recordTypeConfig.messages.record;

    const typeNameMessage = singleSelect
      ? (nameMessages.itemName || nameMessages.name)
      : nameMessages.collectionName;

    const typeName = <FormattedMessage {...typeNameMessage} />;

    return (
      <header className={styles.common}>
        <h1><FormattedMessage {...titleMessage} values={{ typeName, query: '' }} /></h1>
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

  const nameMessages = vocabularyConfig
    ? vocabularyConfig.messages
    : recordTypeConfig.messages.record;

  const typeNameMessage = singleSelect
    ? (nameMessages.itemName || nameMessages.name)
    : nameMessages.collectionName;

  const typeName = <FormattedMessage {...typeNameMessage} />;

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
        <FormattedMessage {...titleMessage} values={{ typeName, query: queryTitle }} />
      </h1>
      {subtitle}
    </header>
  );
}

SearchToSelectTitleBar.propTypes = propTypes;
SearchToSelectTitleBar.defaultProps = defaultProps;
