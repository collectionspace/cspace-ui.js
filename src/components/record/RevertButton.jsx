import React, { PropTypes } from 'react';
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
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  revert: PropTypes.func,
};

export default function RevertButton(props) {
  const {
    csid,
    isModified,
    revert,
  } = props;

  if (!csid) {
    return null;
  }

  return (
    <Button
      className={styles.common}
      disabled={!isModified}
      icon
      name="revert"
      onClick={revert}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

RevertButton.propTypes = propTypes;
