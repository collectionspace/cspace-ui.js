import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/BackButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'backButton.label',
    description: 'Label of the back button.',
    defaultMessage: 'Back',
  },
});

const propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: <FormattedMessage {...messages.label} />,
};

export default function BackButton(props) {
  const {
    label,
    onClick,
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="back"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;
