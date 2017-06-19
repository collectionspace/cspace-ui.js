import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import RecordBrowserNavBarContainer from '../../containers/record/RecordBrowserNavBarContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RelatedRecordBrowserContainer from '../../containers/record/RelatedRecordBrowserContainer';
import styles from '../../../styles/cspace-ui/RecordBrowser.css';

const propTypes = {
  cloneCsid: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  history: PropTypes.object,
  recordType: PropTypes.string,
  relatedCsid: PropTypes.string,
  relatedRecordType: PropTypes.string,
  vocabulary: PropTypes.string,
  clearPreferredRelatedCsid: PropTypes.func,
  onShowRelated: PropTypes.func,
};

export default class RecordBrowser extends Component {
  constructor() {
    super();

    this.cloneRecord = this.cloneRecord.bind(this);
    this.handleRecordCreated = this.handleRecordCreated.bind(this);
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

    const path =
      [recordType, vocabulary]
        .filter(part => !!part)
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

  handleRecordCreated(newRecordCsid, isNavigating) {
    if (!isNavigating) {
      const {
        history,
        recordType,
        vocabulary,
      } = this.props;

      const path =
        [recordType, vocabulary, newRecordCsid]
          .filter(part => !!part)
          .join('/');

      history.replace(`/record/${path}`);
    }
  }

  render() {
    const {
      cloneCsid,
      config,
      csid,
      history,
      recordType,
      relatedCsid,
      relatedRecordType,
      vocabulary,
      onShowRelated,
    } = this.props;

    let content;

    if (relatedRecordType) {
      content = (
        <RelatedRecordBrowserContainer
          cloneCsid={cloneCsid}
          config={config}
          history={history}
          recordType={recordType}
          csid={csid}
          relatedRecordType={relatedRecordType}
          relatedCsid={relatedCsid}
          onShowRelated={onShowRelated}
        />
      );
    } else {
      content = (
        <RecordEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          csid={csid}
          recordType={recordType}
          vocabulary={vocabulary}
          clone={this.cloneRecord}
          onRecordCreated={this.handleRecordCreated}
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
        {content}
      </div>
    );
  }
}

RecordBrowser.propTypes = propTypes;
