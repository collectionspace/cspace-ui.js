import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/UnrelateButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'unrelateButton.label',
    description: 'Label of the unrelate button.',
    defaultMessage: 'Unrelate',
  },
});

const propTypes = {
  disabled: PropTypes.bool,
  isUnrelating: PropTypes.bool,
  isUnrelatable: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  isUnrelatable: true,
};

export default function UnrelateButton(props) {
  const {
    disabled,
    isUnrelating,
    isUnrelatable,
    onClick,
    ...remainingProps
  } = props;

  if (!isUnrelatable) {
    return null;
  }

  return (
    <Button
      {...remainingProps}
      className={styles.common}
      disabled={disabled || isUnrelating}
      icon
      name="unrelate"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

UnrelateButton.propTypes = propTypes;
UnrelateButton.defaultProps = defaultProps;
