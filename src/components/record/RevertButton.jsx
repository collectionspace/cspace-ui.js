import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RevertButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'revertButton.label',
    description: 'Label of the revert button.',
    defaultMessage: 'Revert',
  },
});

const propTypes = {
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  label: PropTypes.node,
  workflowState: PropTypes.string,
  onClick: PropTypes.func,
};

export default function RevertButton(props) {
  const {
    isModified,
    isSavePending,
    workflowState,
    onClick,
  } = props;

  if (workflowState === 'locked') {
    return null;
  }

  let {
    label,
  } = props;

  if (!label) {
    label = <FormattedMessage {...messages.label} />;
  }

  return (
    <Button
      className={styles.common}
      disabled={!isModified || isSavePending}
      icon
      name="revert"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

RevertButton.propTypes = propTypes;
