import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { LineInput } = inputComponents;

const messages = defineMessages({
  link: {
    id: 'urlInput.link',
    description: 'Content of the link displayed alongside URL input fields.',
    defaultMessage: 'Open',
  },
});

/**
 * A react-intl aware wrapper around LineInput so that link content may be localized.
 */

export default function URLInput(props) {
  const linkContent = <FormattedMessage {...messages.link} />;

  return (
    <LineInput showLink {...props} linkContent={linkContent} />
  );
}

URLInput.propTypes = LineInput.propTypes;
