import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';

import {
  getServicePath,
  getVocabularyShortID,
} from 'cspace-refname';

import {
  getRecordTypeConfigByServicePath,
  getVocabularyConfigByShortID,
} from '../../helpers/configHelpers';

const propTypes = {
  config: PropTypes.object,
  item: PropTypes.instanceOf(Immutable.Map),
  message: PropTypes.object,
  rel: PropTypes.string,
  state: PropTypes.object,
};

export default function SearchResultItemLink(props) {
  const {
    config,
    item,
    message,
    rel,
    state,
  } = props;

  // TODO: Get meta-number field from config. The docNumber list result field only appears in
  // searches for multiple record types.

  const recordNumber = item.get('docNumber');
  const csid = item.get('csid') || item.get('docId');
  const refName = item.get('refName');
  const servicePath = getServicePath(refName);

  const recordTypeConfig = getRecordTypeConfigByServicePath(config, servicePath);

  const pathParts = ['/record', recordTypeConfig.name];

  if (recordTypeConfig.serviceConfig.serviceType === 'authority') {
    const vocabularyShortID = getVocabularyShortID(refName);

    const vocabularyConfig =
      getVocabularyConfigByShortID(recordTypeConfig, vocabularyShortID);

    if (vocabularyConfig) {
      pathParts.push(vocabularyConfig.name);
    }
  }

  pathParts.push(csid);

  const location = {
    state,
    pathname: pathParts.join('/'),
  };

  return (
    <Link rel={rel} to={location}>
      <FormattedMessage {...message} values={{ recordNumber }} />
    </Link>
  );
}

SearchResultItemLink.propTypes = propTypes;
