import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import { components as inputComponents } from 'cspace-input';
import { canList } from '../../helpers/permissionHelpers';

const { QuickSearchInput } = inputComponents;

const messages = defineMessages({
  quickSearchPlaceholder: {
    id: 'quickSearchForm.placeholder',
    description: 'The placeholder text to display in the quick search input.',
    defaultMessage: 'Search',
  },
});

const getRecordTypes = (config, perms) => {
  const { recordTypes } = config;

  return pickBy(recordTypes, (recordTypeConfig, name) => {
    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

    if (
      serviceType === 'object' ||
      serviceType === 'procedure' ||
      serviceType === 'authority'
    ) {
      return canList(name, perms);
    }

    return true;
  });
};

const propTypes = {
  intl: intlShape,
  config: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
};

export default function QuickSearchForm(props) {
  const {
    intl,
    config,
    perms,
    ...remainingProps
  } = props;

  const formatRecordTypeLabel = (name, recordTypeConfig) =>
    intl.formatMessage(recordTypeConfig.messages.record.collectionName);

  const formatVocabularyLabel = (name, vocabularyConfig) =>
    intl.formatMessage(vocabularyConfig.messages.name);

  return (
    <fieldset>
      <QuickSearchInput
        {...remainingProps}
        formatRecordTypeLabel={formatRecordTypeLabel}
        formatVocabularyLabel={formatVocabularyLabel}
        placeholder={intl.formatMessage(messages.quickSearchPlaceholder)}
        recordTypes={getRecordTypes(config, perms)}
      />
    </fieldset>
  );
}

QuickSearchForm.propTypes = propTypes;
