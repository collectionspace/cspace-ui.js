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
  relatedSubjectWorkflowState: PropTypes.string,
  onClick: PropTypes.func,
};

export default function CloneButton(props) {
  const {
    csid,
    isModified,
    isSavePending,
    relatedSubjectWorkflowState,
    onClick,
  } = props;

  if (!csid) {
    return null;
  }

  if (relatedSubjectWorkflowState === 'locked') {
    // We're editing an object record in a secondary tab, and the primary record is locked. This
    // means a new cloned record would not be able to be related to the primary, so the clone
    // button should not appear.

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
