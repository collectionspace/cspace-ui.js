import React, { Component, PropTypes } from 'react';
import { locationShape, routerShape } from 'react-router/lib/PropTypes';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import ErrorPage from './ErrorPage';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordBrowser from '../record/RecordBrowser';
import RecordSideBar from '../record/RecordSideBar';
import { validateLocation } from '../../helpers/configHelpers';
import styles from '../../../styles/cspace-ui/RecordPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';

const propTypes = {
  location: locationShape,
  params: PropTypes.shape({
    recordType: PropTypes.string.isRequired,
    path1: PropTypes.string,
    path2: PropTypes.string,
    path3: PropTypes.string,
  }).isRequired,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
  router: routerShape,
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default class RecordPage extends Component {
  constructor() {
    super();

    this.handleShowRelated = this.handleShowRelated.bind(this);
  }

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
      path3,
    } = this.props.params;

    const {
      config,
    } = this.context;

    let vocabulary;
    let csid;
    let relatedRecordType;

    const recordTypeConfig = get(config, ['recordTypes', recordType]);

    if (recordTypeConfig) {
      const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

      if (serviceType === 'authority') {
        vocabulary = path1;
        csid = path2;
        relatedRecordType = path3;
      } else {
        csid = path1;
        relatedRecordType = path2;
      }
    }

    return {
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
    };
  }

  initRecord() {
    const {
      location,
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
      createNewRecord(recordTypeConfig, vocabularyConfig, location.query.clone);
    }
  }

  handleShowRelated(relatedRecordType) {
    const {
      recordType,
      vocabulary,
      csid,
    } = this.getParams();

    const {
      router,
    } = this.props;

    const path =
      [recordType, vocabulary, csid, relatedRecordType]
        .filter(part => !!part)
        .join('/');

    router.replace(`/record/${path}`);
  }

  render() {
    const {
      config,
    } = this.context;

    const {
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
    } = this.getParams();

    const validation = validateLocation(config, {
      recordType, vocabulary, csid, relatedRecordType,
    });

    if (validation.error) {
      return (
        <ErrorPage error={validation.error} />
      );
    }

    const normalizedCsid = csid || '';

    return (
      <div className={styles.common}>
        <RecordTitleBarContainer csid={normalizedCsid} recordType={recordType} />

        <div className={pageBodyStyles.common}>
          <RecordBrowser
            csid={normalizedCsid}
            recordType={recordType}
            relatedRecordType={relatedRecordType}
            vocabulary={vocabulary}
            config={config}
            onShowRelated={this.handleShowRelated}
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
