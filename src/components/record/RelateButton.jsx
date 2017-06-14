import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RelateButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'relateButton.label',
    description: 'Label of the relate button.',
    defaultMessage: 'Relate existing…',
  },
});

const propTypes = {
  label: PropTypes.node,
};

const defaultProps = {
  label: <FormattedMessage {...messages.label} />,
};

export default function RelateButton(props) {
  const {
    label,
    ...remainingProps
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="relate"
      {...remainingProps}
    >
      {label}
    </Button>
  );
}

RelateButton.propTypes = propTypes;
RelateButton.defaultProps = defaultProps;
