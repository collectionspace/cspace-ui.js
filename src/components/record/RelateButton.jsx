import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RelateButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'relateButton.label',
    description: 'Label of the relate button.',
    defaultMessage: 'Relate existing...',
  },
});

const propTypes = {
  onClick: PropTypes.func,
};

export default function RelateButton(props) {
  const {
    onClick,
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="relate"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

RelateButton.propTypes = propTypes;
