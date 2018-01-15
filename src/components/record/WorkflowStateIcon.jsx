import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import lockedIcon from '../../../images/locked.svg';
import styles from '../../../styles/cspace-ui/WorkflowStateIcon.css';

const messages = defineMessages({
  locked: {
    id: 'workflowStateIcon.locked',
    defaultMessage: 'Locked',
  },
});

const images = {
  locked: lockedIcon,
};

const propTypes = {
  intl: intlShape,
  value: PropTypes.string,
};

function WorkflowStateIcon(props) {
  const {
    intl,
    value,
  } = props;

  const src = images[value];

  if (!src) {
    return null;
  }

  const message = messages[value];
  const desc = message ? intl.formatMessage(message) : value;

  return (
    <img alt={desc} className={styles.common} src={src} title={desc} />
  );
}

WorkflowStateIcon.propTypes = propTypes;

export default injectIntl(WorkflowStateIcon);
