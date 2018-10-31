import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/DeprecateButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'deprecateButton.label',
    description: 'Label of the deprecate button.',
    defaultMessage: 'Deactivate',
  },
});

const propTypes = {
  isDeprecatable: PropTypes.bool,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function DeprecateButton(props) {
  const {
    isDeprecatable,
    isModified,
    isSavePending,
    onClick,
  } = props;

  if (!isDeprecatable) {
    return null;
  }

  return (
    <Button
      className={styles.common}
      disabled={isModified || isSavePending}
      icon
      name="deprecate"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

DeprecateButton.propTypes = propTypes;
