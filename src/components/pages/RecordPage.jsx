import React, { Component, PropTypes } from 'react';
import { locationShape, routerShape } from 'react-router/lib/PropTypes';
import get from 'lodash/get';
import ErrorPage from './ErrorPage';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordBrowserContainer from '../../containers/record/RecordBrowserContainer';
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
    const params = this.getParams(this.props);
    const prevParams = this.getParams(prevProps);

    const {
      csid,
    } = params;

    const {
      csid: prevCsid,
    } = prevParams;

    if (csid !== prevCsid) {
      this.initRecord();
    }
  }

  getParams(props) {
    const {
      recordType,
      path1,
      path2,
      path3,
    } = props.params;

    const {
      config,
    } = this.context;

    let vocabulary;
    let csid;
    let relatedRecordType;
    let relatedCsid;

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
        relatedCsid = path3;
      }
    }

    return {
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
      relatedCsid,
    };
  }

  initRecord() {
    const {
      readRecord,
    } = this.props;

    const {
      config,
    } = this.context;

    const {
      recordType,
      vocabulary,
      csid,
    } = this.getParams(this.props);

    const normalizedCsid = (csid === 'new') ? '' : csid;

    if (normalizedCsid && readRecord) {
      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      const vocabularyConfig = vocabulary
        ? get(recordTypeConfig, ['vocabularies', vocabulary])
        : undefined;

      readRecord(recordTypeConfig, vocabularyConfig, normalizedCsid);
    }
  }

  handleShowRelated(relatedRecordType, relatedCsid) {
    const {
      recordType,
      vocabulary,
      csid,
    } = this.getParams(this.props);

    const {
      router,
    } = this.props;

    const path =
      [recordType, vocabulary, csid, relatedRecordType, relatedCsid]
        .filter(part => !!part)
        .join('/');

    router.replace(`/record/${path}`);
  }

  render() {
    const {
      location,
    } = this.props;

    const {
      config,
    } = this.context;

    const {
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
      relatedCsid,
    } = this.getParams(this.props);

    const cloneCsid = location.query.clone;
    const normalizedCsid = (csid === 'new') ? '' : (csid || '');
    const normalizedRelatedCsid = (relatedCsid === 'new') ? '' : relatedCsid;

    const validation = validateLocation(config, {
      recordType,
      vocabulary,
      relatedRecordType,
      csid: normalizedCsid,
      relatedCsid: normalizedRelatedCsid,
    });

    if (validation.error) {
      return (
        <ErrorPage error={validation.error} />
      );
    }

    return (
      <div className={styles.common}>
        <RecordTitleBarContainer csid={normalizedCsid} recordType={recordType} />

        <div className={pageBodyStyles.common}>
          <RecordBrowserContainer
            cloneCsid={cloneCsid}
            csid={normalizedCsid}
            recordType={recordType}
            relatedCsid={normalizedRelatedCsid}
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
