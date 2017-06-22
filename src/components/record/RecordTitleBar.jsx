import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import TitleBar from '../sections/TitleBar';
import SearchResultTraverserContainer from '../../containers/search/SearchResultTraverserContainer';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';

const propTypes = {
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  searchName: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
};

const contextTypes = {
  config: PropTypes.object,
};

export default function RecordTitleBar(props, context) {
  const {
    csid,
    data,
    recordType,
    searchName,
    searchDescriptor,
  } = props;

  const {
    config,
  } = context;

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return null;
  }

  const cspaceDocument = data ? data.get(DOCUMENT_PROPERTY_NAME) : undefined;

  const title = recordTypeConfig.title(cspaceDocument);
  const aside = <FormattedMessage {...recordTypeConfig.messages.record.name} />;

  let nav;

  if (searchDescriptor) {
    nav = (
      <SearchResultTraverserContainer
        config={config}
        csid={csid}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />
    );
  }

  return (
    <TitleBar
      title={title}
      aside={aside}
      nav={nav}
    />
  );
}

RecordTitleBar.propTypes = propTypes;
RecordTitleBar.contextTypes = contextTypes;
