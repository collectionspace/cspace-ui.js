import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import get from 'lodash/get';
import Immutable from 'immutable';
import RecordBrowserNavBarContainer from '../../containers/record/RecordBrowserNavBarContainer';
import RecordSidebarToggleButtonContainer from '../../containers/record/RecordSidebarToggleButtonContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RelatedRecordBrowserContainer from '../../containers/record/RelatedRecordBrowserContainer';
import { searchDescriptorToLocation } from '../../helpers/searchHelpers';
import styles from '../../../styles/cspace-ui/RecordBrowser.css';

const propTypes = {
  cloneCsid: PropTypes.string,
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  dockTop: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  recordType: PropTypes.string,
  relatedCsid: PropTypes.string,
  relatedRecordType: PropTypes.string,
  vocabulary: PropTypes.string,
  workflowState: PropTypes.string,
  clearPreferredRelatedCsid: PropTypes.func,
  onShowRelated: PropTypes.func,
};

export default class RecordBrowser extends Component {
  constructor() {
    super();

    this.cloneRecord = this.cloneRecord.bind(this);
    this.handleRecordCreated = this.handleRecordCreated.bind(this);
    this.handleRecordTransitioned = this.handleRecordTransitioned.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      csid,
    } = this.props;

    const {
      csid: prevCsid,
    } = prevProps;

    if (csid !== prevCsid) {
      this.clearPreferredRelatedCsid();
    }
  }

  componentWillUnmount() {
    this.clearPreferredRelatedCsid();
  }

  handleRecordCreated(newRecordCsid, isNavigating) {
    if (!isNavigating) {
      const {
        history,
        recordType,
        vocabulary,
      } = this.props;

      const path = [recordType, vocabulary, newRecordCsid]
        .filter((part) => !!part)
        .join('/');

      history.replace(`/record/${path}`);
    }
  }

  handleRecordTransitioned(transitionName) {
    const {
      history,
      location,
    } = this.props;

    if (transitionName === 'delete') {
      // The record was soft-deleted.

      const searchDescriptor = get(location, ['state', 'searchDescriptor']);

      let newLocation;

      if (searchDescriptor) {
        // We came from a search. Return to the search result page.

        newLocation = searchDescriptorToLocation(Immutable.fromJS(searchDescriptor));
      } else {
        // Go to the index page.

        newLocation = '/';
      }

      history.replace(newLocation);
    }
  }

  clearPreferredRelatedCsid() {
    const {
      clearPreferredRelatedCsid,
    } = this.props;

    if (clearPreferredRelatedCsid) {
      clearPreferredRelatedCsid();
    }
  }

  cloneRecord() {
    const {
      csid,
      recordType,
      vocabulary,
      history,
    } = this.props;

    const path = [recordType, vocabulary]
      .filter((part) => !!part)
      .join('/');

    const query = {
      clone: csid,
    };

    const queryString = qs.stringify(query);

    history.push({
      pathname: `/record/${path}`,
      search: `?${queryString}`,
    });
  }

  render() {
    const {
      cloneCsid,
      config,
      csid,
      dockTop,
      history,
      location,
      recordType,
      relatedCsid,
      relatedRecordType,
      vocabulary,
      workflowState,
      onShowRelated,
    } = this.props;

    let content;

    if (relatedRecordType) {
      content = (
        <RelatedRecordBrowserContainer
          cloneCsid={cloneCsid}
          config={config}
          history={history}
          location={location}
          recordType={recordType}
          csid={csid}
          relatedRecordType={relatedRecordType}
          relatedCsid={relatedCsid}
          workflowState={workflowState}
          onShowRelated={onShowRelated}
        />
      );
    } else {
      content = (
        <RecordEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          csid={csid}
          dockTop={dockTop}
          recordType={recordType}
          vocabulary={vocabulary}
          clone={this.cloneRecord}
          onRecordCreated={this.handleRecordCreated}
          onRecordTransitioned={this.handleRecordTransitioned}
        />
      );
    }

    return (
      <div className={styles.common}>
        <RecordBrowserNavBarContainer
          config={config}
          csid={csid}
          recordType={recordType}
          relatedRecordType={relatedRecordType}
          onSelect={onShowRelated}
        />
        <RecordSidebarToggleButtonContainer
          recordType={recordType}
          config={config}
        />
        {content}
      </div>
    );
  }
}

RecordBrowser.propTypes = propTypes;
