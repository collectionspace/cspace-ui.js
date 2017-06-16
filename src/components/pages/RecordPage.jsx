import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash/get';
import ErrorPage from './ErrorPage';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordBrowserContainer from '../../containers/record/RecordBrowserContainer';
import RecordSideBar from '../record/RecordSideBar';
import { validateLocation } from '../../helpers/configHelpers';
import styles from '../../../styles/cspace-ui/RecordPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';

const propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  // Use of the match prop isn't being detected by eslint.
  match: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  readRecord: PropTypes.func,
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
    } = props.match.params;

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
      history,
    } = this.props;

    const path =
      [recordType, vocabulary, csid, relatedRecordType, relatedCsid]
        .filter(part => !!part)
        .join('/');

    history.replace(`/record/${path}`);
  }

  render() {
    const {
      history,
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

    const query = qs.parse(location.search.substring(1));

    const cloneCsid = query.clone;
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
            history={history}
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
