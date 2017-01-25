import React, { PropTypes } from 'react';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordTabs from '../record/RecordTabs';
import RecordSideBar from '../record/RecordSideBar';
import styles from '../../../styles/cspace-ui/RecordPage.css';
import recordBodyStyles from '../../../styles/cspace-ui/RecordBody.css';

export default function RecordPage(props, context) {
  const csid = props.params.csid || '';
  const recordType = props.params.recordType;

  const {
    config,
  } = context;

  return (
    <div className={styles.common}>
      <RecordTitleBarContainer csid={csid} recordType={recordType} />

      <div className={recordBodyStyles.common}>
        <RecordTabs csid={csid} recordType={recordType} config={config} />
        <RecordSideBar csid={csid} recordType={recordType} config={config} />
      </div>
    </div>
  );
}

RecordPage.propTypes = {
  params: PropTypes.shape({
    csid: PropTypes.string,
    recordType: PropTypes.string.isRequired,
  }).isRequired,
};

RecordPage.contextTypes = {
  config: PropTypes.object.isRequired,
};
