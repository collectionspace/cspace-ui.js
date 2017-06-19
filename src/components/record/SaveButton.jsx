import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import ErrorBadge from './ErrorBadge';
import styles from '../../../styles/cspace-ui/SaveButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'saveButton.label',
    description: 'Label of the save button.',
    defaultMessage: 'Save',
  },
  validationErrors: {
    id: 'saveButton.validationErrors',
    description: 'Text of the tooltip shown when the save button is disabled due to field validation errors.',
    defaultMessage: 'Field validation errors must be corrected before this record can be saved.',
  },
});

const propTypes = {
  intl: intlShape,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  label: PropTypes.node,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onClick: PropTypes.func,
  onErrorBadgeClick: PropTypes.func,
};

function SaveButton(props) {
  const {
    intl,
    isModified,
    isSavePending,
    validationErrors,
    onClick,
    onErrorBadgeClick,
  } = props;

  let className;

  if (isSavePending) {
    className = styles.pending;
  } else if (isModified) {
    className = styles.normal;
  } else {
    className = styles.done;
  }

  let {
    label,
  } = props;

  if (!label) {
    label = <FormattedMessage {...messages.label} />;
  }

  const errorBadge = validationErrors
    ? <ErrorBadge onClick={onErrorBadgeClick} />
    : null;

  const title = validationErrors
    ? intl.formatMessage(messages.validationErrors)
    : '';

  const button = (
    <Button
      className={className}
      disabled={validationErrors || isSavePending}
      icon
      name="save"
      title={title}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  if (errorBadge) {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        {button}
        {errorBadge}
      </div>
    );
  }

  return button;
}

SaveButton.propTypes = propTypes;

export default injectIntl(SaveButton);
