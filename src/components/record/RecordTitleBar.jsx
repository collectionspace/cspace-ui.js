import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

export default function RecordTitleBar(props, context) {
  const {
    data,
    service,
  } = props;

  const {
    records,
  } = context;

  const record = records[service];

  if (!record) {
    return null;
  }

  return (
    <header>
      <div>
        <h1>{record.pageTitle(data)}</h1>
        <h2><FormattedMessage {...record.messages.recordNameTitle} /></h2>
      </div>
    </header>
  );
}

RecordTitleBar.propTypes = {
  data: PropTypes.object,
  service: PropTypes.string,
  title: PropTypes.string,
};

RecordTitleBar.contextTypes = {
  records: React.PropTypes.object,
};
