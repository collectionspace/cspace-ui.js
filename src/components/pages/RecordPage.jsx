import React, { PropTypes } from 'react';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import styles from '../../../styles/cspace-ui/RecordPage.css';

export default function RecordPage(props) {
  const {
    csid,
    service,
  } = props.params;

  return (
    <div className={styles.common}>
      <RecordTitleBarContainer csid={csid} service={service} />
      <RecordEditorContainer csid={csid} />
    </div>
  );
}

RecordPage.propTypes = {
  params: PropTypes.object.isRequired,
};
