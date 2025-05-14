import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { findVocabularyUses } from '../../helpers/configHelpers';
import { formatExtensionFieldName } from '../../helpers/formatHelpers';
import { ConnectedPanel as Panel } from '../../containers/layout/PanelContainer';
import styles from '../../../styles/cspace-ui/VocabularyUsedByPanel.css';

import {
  TermPickerInput,
} from '../../helpers/configContextInputs';

const messages = defineMessages({
  title: {
    id: 'vocabularyUsedByPanel.title',
    defaultMessage: 'Used By',
  },
  notUsed: {
    id: 'vocabularyUsedByPanel.notUsed',
    defaultMessage: 'No uses found.',
  },
});

const renderUses = (uses, config, intl) => {
  const usedByRecordTypes = uses ? Object.keys(uses) : null;

  if (!usedByRecordTypes || usedByRecordTypes.length === 0) {
    return <div><FormattedMessage {...messages.notUsed} /></div>;
  }

  const {
    recordTypes,
  } = config;

  const formattedUses = {};

  usedByRecordTypes.forEach((recordType) => {
    const formattedRecordName = intl.formatMessage(recordTypes[recordType].messages.record.name);

    const formattedFieldNames = uses[recordType]
      .map((fieldConfig) => formatExtensionFieldName(intl, fieldConfig))
      .sort();

    formattedUses[formattedRecordName] = formattedFieldNames;
  });

  const items = Object.keys(formattedUses).sort().map((formattedRecordName, index) => (
    // FIXME: Use a different key
    // eslint-disable-next-line react/no-array-index-key
    <li key={index}>
      <div>{formattedRecordName}</div>
      <ul>
        {
          formattedUses[formattedRecordName].map((formattedFieldName, fieldIndex) => (
            // FIXME: Use a different key
            // eslint-disable-next-line react/no-array-index-key
            <li key={fieldIndex}>{formattedFieldName}</li>
          ))
        }
      </ul>
    </li>
  ));

  return (
    <ul>
      {items}
    </ul>
  );
};

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  data: PropTypes.instanceOf(Immutable.Map),
};

const contextTypes = {
  intl: intlShape,
};

export default function VocabularyUsedByPanel(props, context) {
  const {
    config,
    data,
  } = props;

  const {
    intl,
  } = context;

  if (!data) {
    return null;
  }

  const shortId = data.getIn(['document', 'ns2:vocabularies_common', 'shortIdentifier']);
  const uses = findVocabularyUses(config, shortId, TermPickerInput);
  const title = <h3><FormattedMessage {...messages.title} /></h3>;

  return (
    <Panel
      className={styles.common}
      collapsible
      collapsed
      config={config}
      header={title}
      name="usedBy"
      recordType="vocabulary"
    >
      {renderUses(uses, config, intl)}
    </Panel>
  );
}

VocabularyUsedByPanel.propTypes = propTypes;
VocabularyUsedByPanel.contextTypes = contextTypes;
