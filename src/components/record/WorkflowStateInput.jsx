import React from 'react';
import PropTypes from 'prop-types';
import { helpers as inputHelpers } from 'cspace-input';
import WorkflowStateIcon from './WorkflowStateIcon';
import styles from '../../../styles/cspace-ui/WorkflowStateInput.css';

const {
  pathPropType,
} = inputHelpers.pathHelpers;

const propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  readOnly: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
  value: PropTypes.string,
};

export default function WorkflowStateInput(props) {
  const {
    value,
  } = props;

  return (
    <div className={styles.common}>
      <WorkflowStateIcon value={value} />
    </div>
  );
}

WorkflowStateInput.propTypes = propTypes;
