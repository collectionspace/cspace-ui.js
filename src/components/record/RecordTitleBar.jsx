import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { FormattedMessage } from 'react-intl';
import TitleBar from '../sections/TitleBar';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
// import styles from '../../../styles/cspace-ui/RecordTitleBar.css';

const propTypes = {
  data: PropTypes.instanceOf(Immutable.Map),
  // isReadPending: PropTypes.bool,
  recordType: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
};

export default function RecordTitleBar(props, context) {
  const {
    data,
    // isReadPending,
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
  const subtitle = <FormattedMessage {...recordTypeConfig.messages.record.recordNameTitle} />;

  return (
    <TitleBar
      title={title}
      subtitle={subtitle}
    />
  );
}

RecordTitleBar.propTypes = propTypes;
RecordTitleBar.contextTypes = contextTypes;
