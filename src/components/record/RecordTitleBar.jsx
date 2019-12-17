import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import TitleBar from '../sections/TitleBar';
import SearchResultTraverserContainer from '../../containers/search/SearchResultTraverserContainer';
import { getWorkflowState } from '../../helpers/recordDataHelpers';
import WorkflowStateIcon from './WorkflowStateIcon';

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
  // eslint-disable-next-line react/forbid-prop-types
  originSearchPageState: PropTypes.object,
  onDocked: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  intl: intlShape,
};

export default function RecordTitleBar(props, context) {
  const {
    csid,
    data,
    recordType,
    vocabulary,
    searchName,
    searchDescriptor,
    originSearchPageState,
    onDocked,
    ...remainingProps
  } = props;

  const {
    config,
    intl,
  } = context;

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return null;
  }

  const title = recordTypeConfig.title(data, { config, intl });

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
        originSearchPageState={originSearchPageState}
      />
    );
  }

  const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);
  const workflowStateIcon = <WorkflowStateIcon value={getWorkflowState(data)} />;

  return (
    <TitleBar
      serviceType={serviceType}
      title={title}
      aside={aside}
      icon={workflowStateIcon}
      nav={nav}
      onDocked={onDocked}
      {...remainingProps}
    />
  );
}

RecordTitleBar.propTypes = propTypes;
RecordTitleBar.contextTypes = contextTypes;
