import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

export default function CreatePage(props, context) {
  const {
    config,
  } = context;

  const {
    recordTypes,
  } = config;

  let items = null;

  if (recordTypes) {
    items = Object.keys(recordTypes).map(recordType =>
      <li key={recordType}>
        <Link to={`record/${recordType}`}>
          <FormattedMessage {...recordTypes[recordType].messageDescriptors.recordNameTitle} />
        </Link>
      </li>
    );
  }

  return (
    <div>
      <h2>Create New</h2>

      <ul>
        {items}
      </ul>
    </div>
  );
}

CreatePage.contextTypes = {
  config: PropTypes.object,
};
