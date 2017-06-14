import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/UnrelateButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'unrelateButton.label',
    description: 'Label of the unrelate button.',
    defaultMessage: 'Unrelate',
  },
});

const propTypes = {
  onClick: PropTypes.func,
};

export default function UnrelateButton(props) {
  const {
    onClick,
    ...remainingProps
  } = props;

  return (
    <Button
      {...remainingProps}
      className={styles.common}
      icon
      name="unrelate"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

UnrelateButton.propTypes = propTypes;
