import React, { PropTypes } from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { KeywordSearchInput } = inputComponents;

const messages = defineMessages({
  keywordSearchPlaceholder: {
    id: 'keywordSearch.placeholder',
    description: 'The placeholder text to display in the keyword search input.',
    defaultMessage: 'Search...',
  },
});

const propTypes = {
  intl: intlShape,
  recordTypes: PropTypes.object,
};

export default function KeywordSearch(props) {
  const {
    intl,
    recordTypes,
    ...remainingProps
  } = props;

  return (
    <fieldset>
      <KeywordSearchInput
        {...remainingProps}
        placeholder={intl.formatMessage(messages.keywordSearchPlaceholder)}
        recordTypes={recordTypes}
      />
    </fieldset>
  );
}

KeywordSearch.propTypes = propTypes;
