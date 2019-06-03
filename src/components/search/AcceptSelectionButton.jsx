import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/AcceptSelectionButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'acceptSelectionButton.label',
    description: 'Label of the accept selection button.',
    defaultMessage: 'Use selection',
  },
});

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
};

const defaultProps = {
  className: styles.common,
  label: <FormattedMessage {...messages.label} />,
};

export default function AcceptSelectionButton(props) {
  const {
    className,
    label,
    ...remainingProps
  } = props;

  return (
    <Button
      className={className}
      icon
      name="accept"
      {...remainingProps}
    >
      {label}
    </Button>
  );
}

AcceptSelectionButton.propTypes = propTypes;
AcceptSelectionButton.defaultProps = defaultProps;
