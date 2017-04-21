import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import RecordBrowserNavBarContainer from '../../containers/record/RecordBrowserNavBarContainer';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import RelatedRecordBrowserContainer from '../../containers/record/RelatedRecordBrowserContainer';
import styles from '../../../styles/cspace-ui/RecordBrowser.css';

const propTypes = {
  cloneCsid: PropTypes.string,
  config: PropTypes.object,
  csid: PropTypes.string,
  recordType: PropTypes.string,
  relatedCsid: PropTypes.string,
  relatedRecordType: PropTypes.string,
  router: routerShape,
  vocabulary: PropTypes.string,
  clearPreferredRelatedCsid: PropTypes.func,
  onShowRelated: PropTypes.func,
};

class RecordBrowser extends Component {
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
      router,
    } = this.props;

    const path =
      [recordType, vocabulary]
        .filter(part => !!part)
        .join('/');

    router.push({
      pathname: `/record/${path}`,
      query: {
        clone: csid,
      },
    });
  }

  handleRecordCreated(newRecordCsid) {
    const {
      recordType,
      vocabulary,
      router,
    } = this.props;

    const path =
      [recordType, vocabulary, newRecordCsid]
        .filter(part => !!part)
        .join('/');

    router.replace(`/record/${path}`);
  }

  render() {
    const {
      cloneCsid,
      config,
      csid,
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

export default withRouter(RecordBrowser);
