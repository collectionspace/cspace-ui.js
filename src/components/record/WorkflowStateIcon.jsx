import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import styles from '../../../styles/cspace-ui/WorkflowStateIcon.css';

const messages = defineMessages({
  locked: {
    id: 'workflowStateIcon.locked',
    defaultMessage: 'Locked',
  },
});

const propTypes = {
  intl: intlShape,
  state: PropTypes.string,
};

function WorkflowStateIcon(props) {
  const {
    intl,
    state,
  } = props;

  if (!state || state === 'project' || state === 'replicated') {
    return null;
  }

  const message = messages[state];
  const title = message ? intl.formatMessage(message) : undefined;

  return (
    <div className={styles[state]} title={title} />
  );
}

WorkflowStateIcon.propTypes = propTypes;

export default injectIntl(WorkflowStateIcon);
