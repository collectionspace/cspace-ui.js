import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/ExportButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'exportButton.label',
    description: 'Label of the export button.',
    defaultMessage: 'Export…',
  },
});

const propTypes = {
  label: PropTypes.node,
};

const defaultProps = {
  label: <FormattedMessage {...messages.label} />,
};

export default function ExportButton(props) {
  const {
    label,
    ...remainingProps
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="export"
      {...remainingProps}
    >
      {label}
    </Button>
  );
}

ExportButton.propTypes = propTypes;
ExportButton.defaultProps = defaultProps;
