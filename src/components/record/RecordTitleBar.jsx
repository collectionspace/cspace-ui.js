import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import TitleBar from '../sections/TitleBar';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';

const propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
};

export default function RecordTitleBar(props, context) {
  const {
    data,
    recordType,
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

  return (
    <TitleBar
      title={title}
      aside={aside}
    />
  );
}

RecordTitleBar.propTypes = propTypes;
RecordTitleBar.contextTypes = contextTypes;
