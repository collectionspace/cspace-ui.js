import React, { Component, PropTypes } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordTabs from '../record/RecordTabs';
import RecordSideBar from '../record/RecordSideBar';
import styles from '../../../styles/cspace-ui/RecordPage.css';
import recordBodyStyles from '../../../styles/cspace-ui/RecordBody.css';

const propTypes = {
  params: PropTypes.shape({
    recordType: PropTypes.string.isRequired,
    path1: PropTypes.string,
    path2: PropTypes.string,
  }).isRequired,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default class RecordPage extends Component {
  componentDidMount() {
    this.initRecord();
  }

  componentDidUpdate(prevProps) {
    const {
      params,
    } = this.props;

    const {
      params: prevParams,
    } = prevProps;

    if (!isEqual(params, prevParams)) {
      this.initRecord();
    }
  }

  getParams() {
    const {
      recordType,
      path1,
      path2,
    } = this.props.params;

    const {
      config,
    } = this.context;

    let vocabulary;
    let csid;

    const recordTypeConfig = config.recordTypes[recordType];

    if (recordTypeConfig) {
      const serviceType = recordTypeConfig.serviceConfig.serviceType;

      if (serviceType === 'authority') {
        vocabulary = path1;
        csid = path2;
      } else {
        csid = path1;
      }
    }

    return {
      recordType,
      vocabulary,
      csid,
    };
  }

  initRecord() {
    const {
      createNewRecord,
      readRecord,
    } = this.props;

    const {
      config,
    } = this.context;

    const {
      recordType,
      vocabulary,
      csid,
    } = this.getParams();

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return;
    }

    let vocabularyConfig;

    if (vocabulary) {
      vocabularyConfig = get(recordTypeConfig, ['vocabularies', vocabulary]);

      if (!vocabularyConfig) {
        return;
      }
    }

    if (csid) {
      if (readRecord) {
        readRecord(recordTypeConfig, vocabularyConfig, csid);
      }
    } else if (createNewRecord) {
      createNewRecord(recordTypeConfig);
    }
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      recordType,
      vocabulary,
      csid,
    } = this.getParams();

    const normalizedCsid = csid || '';

    return (
      <div className={styles.common}>
        <RecordTitleBarContainer csid={normalizedCsid} recordType={recordType} />

        <div className={recordBodyStyles.common}>
          <RecordTabs
            csid={normalizedCsid}
            recordType={recordType}
            vocabulary={vocabulary}
            config={config}
          />
          <RecordSideBar
            csid={normalizedCsid}
            recordType={recordType}
            vocabulary={vocabulary}
            config={config}
          />
        </div>
      </div>
    );
  }
}

RecordPage.propTypes = propTypes;
RecordPage.contextTypes = contextTypes;
