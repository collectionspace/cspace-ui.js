import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SubrecordDetachButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'subrecordDetachButton.label',
    description: 'Default label of the subrecord detach button.',
    defaultMessage: 'Remove',
  },
});

const propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: <FormattedMessage {...messages.label} />,
};

export default function SubrecordDetachButton(props) {
  const {
    label,
    onClick,
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="detachSubrecord"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

SubrecordDetachButton.propTypes = propTypes;
SubrecordDetachButton.defaultProps = defaultProps;
