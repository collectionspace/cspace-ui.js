import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import TitleBar from '../sections/TitleBar';
import SearchResultTraverserContainer from '../../containers/search/SearchResultTraverserContainer';
import WorkflowStateIcon from './WorkflowStateIcon';

import {
  DOCUMENT_PROPERTY_NAME,
  getWorkflowState,
} from '../../helpers/recordDataHelpers';

const messages = defineMessages({
  authority: {
    id: 'recordTitleBar.authority',
    description: 'For authority items, the record type and vocabulary displayed in the right side of the title bar.',
    defaultMessage: '{recordType} - {vocabulary}',
  },
});

const propTypes = {
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  searchName: PropTypes.string,
  searchDescriptor: PropTypes.instanceOf(Immutable.Map),
  onDocked: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object,
};

export default function RecordTitleBar(props, context) {
  const {
    csid,
    data,
    recordType,
    vocabulary,
    searchName,
    searchDescriptor,
    onDocked,
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

  let aside;

  if (vocabulary) {
    const values = {
      recordType: <FormattedMessage {...recordTypeConfig.messages.record.name} />,
      vocabulary: <FormattedMessage {...recordTypeConfig.vocabularies[vocabulary].messages.name} />,
    };

    aside = <FormattedMessage {...messages.authority} values={values} />;
  } else {
    aside = <FormattedMessage {...recordTypeConfig.messages.record.name} />;
  }

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

  const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);
  const workflowStateIcon = <WorkflowStateIcon state={getWorkflowState(data)} />;

  return (
    <TitleBar
      serviceType={serviceType}
      title={title}
      aside={aside}
      icon={workflowStateIcon}
      nav={nav}
      onDocked={onDocked}
    />
  );
}

RecordTitleBar.propTypes = propTypes;
RecordTitleBar.contextTypes = contextTypes;
