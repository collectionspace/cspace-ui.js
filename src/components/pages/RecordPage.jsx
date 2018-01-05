import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import qs from 'qs';
import get from 'lodash/get';
import ErrorPage from './ErrorPage';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordBrowserContainer from '../../containers/record/RecordBrowserContainer';
import RecordSideBar from '../record/RecordSideBar';
import { validateLocation } from '../../helpers/configHelpers';
import { canRelate } from '../../helpers/permissionHelpers';
import { getWorkflowState } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';

export const getParams = (props) => {
  const {
    config,
  } = props;

  const {
    recordType,
    path1,
    path2,
    path3,
  } = props.match.params;

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
};

const propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.instanceOf(Immutable.Map),
  error: PropTypes.instanceOf(Immutable.Map),
  history: PropTypes.object,
  location: PropTypes.object,
  // Use of the match prop isn't being detected by eslint.
  match: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  perms: PropTypes.instanceOf(Immutable.Map),
  readRecord: PropTypes.func,
};

export default class RecordPage extends Component {
  constructor() {
    super();

    this.handleShowRelated = this.handleShowRelated.bind(this);
    this.handleTitleBarDocked = this.handleTitleBarDocked.bind(this);

    this.state = ({
      headerDockPosition: null,
    });
  }

  componentDidMount() {
    this.initRecord();
  }

  componentDidUpdate(prevProps) {
    const params = getParams(this.props);
    const prevParams = getParams(prevProps);

    const {
      csid,
    } = params;

    const {
      csid: prevCsid,
    } = prevParams;

    const {
      perms,
    } = this.props;

    const {
      perms: prevPerms,
    } = prevProps;

    if (csid !== prevCsid || perms !== prevPerms) {
      this.initRecord();
    }
  }

  initRecord() {
    const {
      config,
      readRecord,
    } = this.props;

    const {
      recordType,
      vocabulary,
      csid,
    } = getParams(this.props);

    const normalizedCsid = (csid === 'new') ? '' : csid;

    if (normalizedCsid && readRecord) {
      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      const vocabularyConfig = vocabulary
        ? get(recordTypeConfig, ['vocabularies', vocabulary])
        : undefined;

      readRecord(config, recordTypeConfig, vocabularyConfig, normalizedCsid);
    }
  }

  handleShowRelated(relatedRecordType, relatedCsid) {
    const {
      recordType,
      vocabulary,
      csid,
    } = getParams(this.props);

    const {
      history,
      location,
    } = this.props;

    const path =
      [recordType, vocabulary, csid, relatedRecordType, relatedCsid]
        .filter(part => !!part)
        .join('/');

    history.replace({
      pathname: `/record/${path}`,
      state: location.state,
    });
  }

  handleTitleBarDocked(height) {
    this.setState({
      headerDockPosition: height,
    });
  }

  render() {
    const {
      headerDockPosition,
    } = this.state;

    const {
      config,
      data,
      error,
      history,
      location,
      perms,
    } = this.props;

    if (error) {
      return (
        <ErrorPage error={error.toJS()} />
      );
    }

    const {
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
      relatedCsid,
    } = getParams(this.props);

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

    const locationState = location.state;

    let searchName;
    let searchDescriptor;

    if (locationState) {
      searchName = locationState.searchName;
      searchDescriptor = Immutable.fromJS(locationState.searchDescriptor);
    }

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);
    const workflowState = getWorkflowState(data);

    const isRelatable = (
      workflowState !== 'locked' &&
      canRelate(recordType, perms)
    );

    return (
      <div className={styles[serviceType]}>
        <RecordTitleBarContainer
          csid={normalizedCsid}
          recordType={recordType}
          vocabulary={vocabulary}
          searchName={searchName}
          searchDescriptor={searchDescriptor}
          onDocked={this.handleTitleBarDocked}
        />
        <div className={pageBodyStyles.common}>
          <RecordBrowserContainer
            cloneCsid={cloneCsid}
            csid={normalizedCsid}
            dockTop={headerDockPosition}
            history={history}
            location={location}
            workflowState={workflowState}
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
            history={history}
            isRelatable={isRelatable}
          />
        </div>
      </div>
    );
  }
}

RecordPage.propTypes = propTypes;
