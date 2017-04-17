import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/OpenButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'openButton.label',
    description: 'Label of the open button.',
    defaultMessage: 'Open',
  },
});

const propTypes = {
  onClick: PropTypes.func,
};

export default function OpenButton(props) {
  const {
    onClick,
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="open"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

OpenButton.propTypes = propTypes;
