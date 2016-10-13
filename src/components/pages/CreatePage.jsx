import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const CreatePage = (props, context) => {
  const {
    recordPlugins,
  } = context;

  const items = Object.keys(recordPlugins).map(recordType =>
    <li key={recordType}>
      <Link to={`record/${recordType}`}>
        <FormattedMessage {...recordPlugins[recordType].messageDescriptors.recordNameTitle} />
      </Link>
    </li>
  );

  return (
    <div>
      <h2>Create New</h2>

      <ul>
        {items}
      </ul>
    </div>
  );
};

CreatePage.contextTypes = {
  recordPlugins: PropTypes.object,
};

export default CreatePage;
