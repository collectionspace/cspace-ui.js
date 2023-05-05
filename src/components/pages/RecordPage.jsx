import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import qs from 'qs';
import get from 'lodash/get';
import ErrorPage from './ErrorPage';
import RecordTitleBarContainer from '../../containers/record/RecordTitleBarContainer';
import RecordBrowserContainer from '../../containers/record/RecordBrowserContainer';

import RecordSidebar from '../record/RecordSidebar';
import { validateLocation } from '../../helpers/configHelpers';
import { canRelate } from '../../helpers/permissionHelpers';
import { refNameToUrl } from '../../helpers/refNameHelpers';
import { getWorkflowState, getRefName, getCsid } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordPage.css';
import pageBodyStyles from '../../../styles/cspace-ui/PageBody.css';

export const getParams = (props) => {
  const {
    config,
    match,
  } = props;

  const {
    recordType,
    path1,
    path2,
    path3,
  } = match.params;

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
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
  data: PropTypes.instanceOf(Immutable.Map),
  error: PropTypes.instanceOf(Immutable.Map),
  history: PropTypes.shape({
    replace: PropTypes.func,
  }),
  isSidebarOpen: PropTypes.bool,
  location: PropTypes.shape({
    search: PropTypes.string,
    state: PropTypes.object,
  }),
  // Use of the match prop isn't being detected by eslint.
  // eslint-disable-next-line react/no-unused-prop-types
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  perms: PropTypes.instanceOf(Immutable.Map),
  clearRecord: PropTypes.func,
  readRecord: PropTypes.func,
  setRecordPagePrimaryCsid: PropTypes.func,
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
      recordType,
      vocabulary,
      csid,
    } = params;

    const {
      csid: prevCsid,
    } = prevParams;

    const {
      config,
      data,
      history,
      location,
      perms,
      clearRecord,
    } = this.props;

    const {
      perms: prevPerms,
    } = prevProps;

    if (csid !== prevCsid || perms !== prevPerms) {
      this.initRecord();
    } else if ((recordType === 'all' || vocabulary === 'all') && data) {
      // If we got here via an 'all' record type or vocabulary, redirect to the correct record type
      // and vocabulary page once we have data.

      const dataCsid = getCsid(data);

      // TODO: This workaround for DRYD-487 can be removed when that issue is fixed. For now we
      // need to clear the record data retrieved through servicegroups/common/items, since it
      // won't have returned the hierarchy relations. Clearing the existing record data will cause
      // it to be retrieved again through the specific record service, so that the hierarchy
      // relations will be included.

      if (clearRecord) {
        clearRecord(dataCsid, true);
      }

      history.replace({
        pathname: refNameToUrl(config, getRefName(data), dataCsid),
        state: location.state,
      });
    }
  }

  componentWillUnmount() {
    const {
      setRecordPagePrimaryCsid,
    } = this.props;

    if (setRecordPagePrimaryCsid) {
      setRecordPagePrimaryCsid(undefined);
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

    const path = [recordType, vocabulary, csid, relatedRecordType, relatedCsid]
      .filter((part) => !!part)
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

  initRecord() {
    const {
      config,
      readRecord,
      setRecordPagePrimaryCsid,
    } = this.props;

    const {
      recordType,
      vocabulary,
      csid,
    } = getParams(this.props);

    const normalizedCsid = (csid === 'new') ? '' : csid;

    if (setRecordPagePrimaryCsid) {
      setRecordPagePrimaryCsid(csid);
    }

    if (normalizedCsid && readRecord) {
      // If vocabulary is 'all', use the 'all' record type, since we can't get a record by csid in
      // an authority without specifying a vocabulary, but we can get a record by csid without
      // specifying any record type.

      const recordTypeConfig = get(config, ['recordTypes', vocabulary === 'all' ? 'all' : recordType]);

      const vocabularyConfig = (vocabulary && vocabulary !== 'all')
        ? get(recordTypeConfig, ['vocabularies', vocabulary])
        : undefined;

      readRecord(config, recordTypeConfig, vocabularyConfig, normalizedCsid);
    }
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
      isSidebarOpen,
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

    if (recordType === 'all' || vocabulary === 'all') {
      // Render nothing for the 'all' record type/vocabulary. We'll redirect to the appropriate
      // page once we've determined what the actual record type/vocabulary are.

      return null;
    }

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

    const searchName = get(location, ['state', 'searchName']);
    const searchDescriptor = Immutable.fromJS(get(location, ['state', 'searchDescriptor']));
    const originSearchPageState = get(location, ['state', 'originSearchPage']);

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);
    const workflowState = getWorkflowState(data);

    const isRelatable = (
      workflowState !== 'locked'
      && canRelate(recordType, perms, config)
    );

    return (
      <div className={styles[serviceType]}>
        <RecordTitleBarContainer
          csid={normalizedCsid}
          recordType={recordType}
          vocabulary={vocabulary}
          searchName={searchName}
          searchDescriptor={searchDescriptor}
          originSearchPageState={originSearchPageState}
          updateDocumentTitle
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
          <RecordSidebar
            csid={normalizedCsid}
            recordType={recordType}
            vocabulary={vocabulary}
            config={config}
            history={history}
            isOpen={isSidebarOpen}
            isRelatable={isRelatable}
          />
        </div>
      </div>
    );
  }
}

RecordPage.propTypes = propTypes;
