import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/CloneButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'cloneButton.label',
    description: 'Label of the clone button.',
    defaultMessage: 'Clone',
  },
});

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function CloneButton(props) {
  const {
    csid,
    isModified,
    isSavePending,
    onClick,
  } = props;

  if (!csid) {
    return null;
  }

  return (
    <Button
      className={styles.common}
      disabled={isModified || isSavePending}
      icon
      name="clone"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

CloneButton.propTypes = propTypes;
