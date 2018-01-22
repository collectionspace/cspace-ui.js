import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/UndeprecateButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'undeprecateButton.label',
    description: 'Label of the undeprecate button.',
    defaultMessage: 'Activate',
  },
});

const propTypes = {
  isDeprecated: PropTypes.bool,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  showDeprecationButtons: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function UndeprecateButton(props) {
  const {
    isDeprecated,
    isModified,
    isSavePending,
    showDeprecationButtons,
    onClick,
  } = props;

  if (!showDeprecationButtons || !isDeprecated) {
    return null;
  }

  return (
    <Button
      className={styles.common}
      disabled={isModified || isSavePending}
      icon
      name="undeprecate"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

UndeprecateButton.propTypes = propTypes;
