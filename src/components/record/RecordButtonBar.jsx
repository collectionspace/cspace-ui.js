import React, { PropTypes } from 'react';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import styles from '../../../styles/cspace-ui/RecordButtonBar.css';

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  revert: PropTypes.func,
  save: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    csid,
    isModified,
    isSavePending,
    revert,
    save,
  } = props;

  return (
    <div className={styles.common}>
      <SaveButton isModified={isModified} isSavePending={isSavePending} save={save} />
      <RevertButton csid={csid} isModified={isModified} revert={revert} />
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
