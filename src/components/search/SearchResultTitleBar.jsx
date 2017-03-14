import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
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
    defaultMessage: 'containing {keyword}',
  },
  related: {
    id: 'searchResultTitleBar.related',
    defaultMessage: 'related to {record}',
  },
});

const propTypes = {
  config: PropTypes.object,
  searchDescriptor: PropTypes.object,
  searchName: PropTypes.string,
};

export default function SearchResultTitleBar(props) {
  const {
    config,
    searchDescriptor,
    searchName,
  } = props;

  const {
    recordType,
    vocabulary,
    csid,
    subresource,
  } = searchDescriptor;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const vocabularyConfig = vocabulary ? get(recordTypeConfig, ['vocabularies', vocabulary]) : undefined;
  const subresourceConfig = subresource ? get(config, ['subresources', subresource]) : undefined;

  const {
    as: advancedSearchCondition,
    kw,
    rel,
  } = searchDescriptor.searchQuery;

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
      {collectionName} {queryTitle}
    </div>
  );

  const aside = (
    <FormattedMessage {...messages.title} />
  );

  return (
    <TitleBar title={title} aside={aside} subtitle={advancedTitle} />
  );
}

SearchResultTitleBar.propTypes = propTypes;
