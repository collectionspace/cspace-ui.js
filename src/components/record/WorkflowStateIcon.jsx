import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import deprecatedIcon from '../../../images/deprecated.svg';
import lockedIcon from '../../../images/locked.svg';
import replicatedIcon from '../../../images/replicated.svg';
import styles from '../../../styles/cspace-ui/WorkflowStateIcon.css';

const messages = defineMessages({
  deprecated: {
    id: 'workflowStateIcon.deprecated',
    defaultMessage: 'Deprecated',
  },
  locked: {
    id: 'workflowStateIcon.locked',
    defaultMessage: 'Locked',
  },
  replicated: {
    id: 'workflowStateIcon.replicated',
    defaultMessage: 'Replicated',
  },
});

const images = {
  replicated: replicatedIcon,
  deprecated: deprecatedIcon,
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

  if (!value) {
    return null;
  }

  const icons = [];

  Object.keys(images).forEach((state) => {
    if (value.includes(state)) {
      const src = images[state];
      const message = messages[state];
      const desc = message ? intl.formatMessage(message) : state;

      icons.push(
        <img key={state} alt={desc} src={src} title={desc} />,
      );
    }
  });

  if (icons.length === 0) {
    return null;
  }

  return (
    <div className={styles.common}>{icons}</div>
  );
}

WorkflowStateIcon.propTypes = propTypes;

export default injectIntl(WorkflowStateIcon);
