import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import Immutable from 'immutable';
import CsidLink from '../navigation/CsidLink';
import TitleBar from '../sections/TitleBar';
import AdvancedSearchBuilder from './AdvancedSearchBuilder';

const messages = defineMessages({
  title: {
    id: 'searchResultTitleBar.title',
    defaultMessage: 'Search Result',
  },
  keyword: {
    id: 'searchResultTitleBar.keyword',
    defaultMessage: 'containing "{keyword}"',
  },
  related: {
    id: 'searchResultTitleBar.related',
    defaultMessage: 'related to {record}',
  },
});

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  searchName: PropTypes.string,
};

export default function SearchResultTitleBar(props) {
  const {
    config,
    searchDescriptor,
    searchName,
    ...remainingProps
  } = props;

  const recordType = searchDescriptor.get('recordType');
  const vocabulary = searchDescriptor.get('vocabulary');
  const csid = searchDescriptor.get('csid');
  const subresource = searchDescriptor.get('subresource');
  const searchQuery = searchDescriptor.get('searchQuery');

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const vocabularyConfig = vocabulary ? get(recordTypeConfig, ['vocabularies', vocabulary]) : undefined;
  const subresourceConfig = subresource ? get(config, ['subresources', subresource]) : undefined;

  const advancedSearchCondition = searchQuery.get('as');
  const kw = searchQuery.get('kw');
  const rel = searchQuery.get('rel');

  let queryTitle;

  if (rel) {
    const recordLink = <CsidLink config={config} searchName={`${searchName}.rel`} csid={rel} />;

    queryTitle = (
      <FormattedMessage
        {...messages.related}
        values={{ record: recordLink }}
      />
    );
  } else {
    queryTitle = kw
      ? <FormattedMessage {...messages.keyword} values={{ keyword: kw }} />
      : null;
  }

  let collectionName;

  if (subresourceConfig) {
    const recordLink = <CsidLink config={config} searchName={`${searchName}.csid`} csid={csid} />;

    collectionName = (
      <FormattedMessage
        {...subresourceConfig.messages.collectionName}
        values={{ record: recordLink }}
      />
    );
  } else if (vocabularyConfig) {
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

  let advancedTitle;

  if (advancedSearchCondition) {
    advancedTitle = (
      <AdvancedSearchBuilder
        condition={advancedSearchCondition}
        config={config}
        inline
        readOnly
        recordType={recordType}
      />
    );
  }

  const title = (
    <div>
      {collectionName}
      {' '}
      {queryTitle}
    </div>
  );

  const aside = (
    <FormattedMessage {...messages.title} />
  );

  return (
    <TitleBar
      title={title}
      aside={aside}
      subtitle={advancedTitle}
      {...remainingProps}
    />
  );
}

SearchResultTitleBar.propTypes = propTypes;
