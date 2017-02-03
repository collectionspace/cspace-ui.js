import React, { PropTypes } from 'react';
import CloneButton from './CloneButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  clone: PropTypes.func,
  revert: PropTypes.func,
  save: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    csid,
    isModified,
    isSavePending,
    clone,
    revert,
    save,
  } = props;

  return (
    <div className={styles.common}>
      <SaveButton
        isModified={isModified}
        isSavePending={isSavePending}
        save={save}
      />
      <CloneButton
        csid={csid}
        isModified={isModified}
        isSavePending={isSavePending}
        clone={clone}
      />
      <RevertButton
        csid={csid}
        isModified={isModified}
        isSavePending={isSavePending}
        revert={revert}
      />
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
