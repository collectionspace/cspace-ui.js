import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import qs from 'qs';
import RelatedRecordButtonBar from './RelatedRecordButtonBar';
import RelatedRecordPanelContainer from '../../containers/record/RelatedRecordPanelContainer';
import RelationEditorContainer from '../../containers/record/RelationEditorContainer';
import SearchToRelateModalContainer from '../../containers/search/SearchToRelateModalContainer';
import { canRelate } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/RelatedRecordBrowser.css';

const propTypes = {
  cloneCsid: PropTypes.string,
  config: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  preferredRelatedCsid: PropTypes.string,
  relatedCsid: PropTypes.string,
  relatedRecordType: PropTypes.string,
  deselectItem: PropTypes.func,
  workflowState: PropTypes.string,
  setPreferredRelatedCsid: PropTypes.func,
  onShowRelated: PropTypes.func,
};

export default class RelatedRecordBrowser extends Component {
  constructor() {
    super();

    this.cloneRelatedRecord = this.cloneRelatedRecord.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleRelateButtonClick = this.handleRelateButtonClick.bind(this);
    this.handleRelatedRecordCreated = this.handleRelatedRecordCreated.bind(this);
    this.handleRelatedRecordClick = this.handleRelatedRecordClick.bind(this);
    this.handleRelatedRecordPanelUnrelated = this.handleRelatedRecordPanelUnrelated.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleModalCloseButtonClick = this.handleModalCloseButtonClick.bind(this);
    this.handleRelationEditorClose = this.handleRelationEditorClose.bind(this);
    this.handleRelationEditorUnrelated = this.handleRelationEditorUnrelated.bind(this);
    this.handleRelationsCreated = this.handleRelationsCreated.bind(this);

    this.state = {
      isSearchToRelateModalOpen: false,
    };
  }

  componentDidMount() {
    this.normalizeRelatedCsid();
  }

  componentDidUpdate(prevProps) {
    const {
      relatedCsid,
      relatedRecordType,
    } = this.props;

    const {
      relatedRecordType: prevRelatedRecordType,
      relatedCsid: prevRelatedCsid,
    } = prevProps;

    if (relatedCsid !== prevRelatedCsid || relatedRecordType !== prevRelatedRecordType) {
      this.normalizeRelatedCsid();
    }
  }

  getRelatedRecordPanelName() {
    const {
      relatedRecordType,
    } = this.props;

    return `relatedRecordBrowser-${relatedRecordType}`;
  }

  normalizeRelatedCsid() {
    const {
      preferredRelatedCsid,
      relatedCsid,
      relatedRecordType,
      setPreferredRelatedCsid,
    } = this.props;

    if (typeof relatedCsid !== 'undefined') {
      if (setPreferredRelatedCsid && (preferredRelatedCsid !== relatedCsid)) {
        setPreferredRelatedCsid(relatedRecordType, relatedCsid);
      }
    } else if (preferredRelatedCsid) {
      const {
        recordType,
        vocabulary,
        csid,
        history,
        location,
      } = this.props;

      const path =
        [recordType, vocabulary, csid, relatedRecordType, preferredRelatedCsid]
          .filter(part => !!part)
          .join('/');

      history.replace({
        pathname: `/record/${path}`,
        state: location.state,
      });
    }
  }

  cloneRelatedRecord(relatedRecordCsid) {
    const {
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
      history,
      location,
    } = this.props;

    const path =
      [recordType, vocabulary, csid, relatedRecordType]
        .filter(part => !!part)
        .join('/');

    const query = {
      clone: relatedRecordCsid,
    };

    const queryString = qs.stringify(query);

    history.replace({
      pathname: `/record/${path}/new`,
      search: `?${queryString}`,
      state: location.state,
    });
  }

  closeModal() {
    this.setState({
      isSearchToRelateModalOpen: false,
    });
  }

  handleCreateButtonClick() {
    const {
      history,
      location,
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
    } = this.props;

    const path =
      [recordType, vocabulary, csid, relatedRecordType, 'new']
        .filter(part => !!part)
        .join('/');

    history.replace({
      pathname: `/record/${path}`,
      state: location.state,
    });
  }

  handleRelateButtonClick() {
    this.setState({
      isSearchToRelateModalOpen: true,
    });
  }

  handleModalCancelButtonClick() {
    this.closeModal();
  }

  handleModalCloseButtonClick() {
    this.closeModal();
  }

  handleRelationEditorClose() {
    const {
      history,
      location,
      recordType,
      vocabulary,
      csid,
      relatedRecordType,
      setPreferredRelatedCsid,
    } = this.props;

    if (setPreferredRelatedCsid) {
      setPreferredRelatedCsid(relatedRecordType, undefined);
    }

    const path =
      [recordType, vocabulary, csid, relatedRecordType]
        .filter(part => !!part)
        .join('/');

    history.replace({
      pathname: `/record/${path}`,
      state: location.state,
    });
  }

  handleRelationEditorUnrelated(subject, object) {
    const {
      deselectItem,
    } = this.props;

    // If a record is unrelated in the editor, deselect it in the store, since it will no longer
    // appear in the related records list.

    if (deselectItem) {
      deselectItem(this.getRelatedRecordPanelName(), object.csid);
    }
  }

  handleRelationsCreated() {
    this.closeModal();
  }

  handleRelatedRecordClick(item) {
    const {
      relatedRecordType,
      onShowRelated,
    } = this.props;

    if (onShowRelated) {
      const relatedCsid = item.get('csid');

      onShowRelated(relatedRecordType, relatedCsid);
    }

    // Prevent the default action.

    return false;
  }

  handleRelatedRecordCreated(newRecordCsid, isNavigating) {
    if (!isNavigating) {
      const {
        history,
        location,
        recordType,
        vocabulary,
        csid,
        relatedRecordType,
      } = this.props;

      const path =
        [recordType, vocabulary, csid, relatedRecordType, newRecordCsid]
          .filter(part => !!part)
          .join('/');

      history.replace({
        pathname: `/record/${path}`,
        state: location.state,
      });
    }
  }

  handleRelatedRecordPanelUnrelated(objects) {
    const {
      relatedCsid,
    } = this.props;

    let isRelatedCsidUnrelated = false;

    for (let i = 0; i < objects.length; i += 1) {
      if (objects[i].csid === relatedCsid) {
        isRelatedCsidUnrelated = true;
        break;
      }
    }

    if (isRelatedCsidUnrelated) {
      this.handleRelationEditorClose();
    }
  }

  render() {
    const {
      cloneCsid,
      config,
      recordType,
      csid,
      perms,
      relatedCsid,
      relatedRecordType,
      workflowState,
    } = this.props;

    const {
      isSearchToRelateModalOpen,
    } = this.state;

    let relationEditor;

    if (typeof relatedCsid !== 'undefined' && relatedCsid !== null) {
      relationEditor = (
        <RelationEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          perms={perms}
          subject={{
            csid,
            recordType,
          }}
          subjectWorkflowState={workflowState}
          object={{
            csid: relatedCsid,
            recordType: relatedRecordType,
          }}
          predicate="affects"
          cloneRecord={this.cloneRelatedRecord}
          onClose={this.handleRelationEditorClose}
          onRecordCreated={this.handleRelatedRecordCreated}
          onUnrelated={this.handleRelationEditorUnrelated}
        />
      );
    }

    const isRelatable = (
      workflowState !== 'locked' &&
      canRelate(recordType, perms) &&
      canRelate(relatedRecordType, perms)
    );

    // TODO: Vary the name of the RelatedRecordPanelContainer depending on the object record type?
    // This would allow selected items to be remembered when switching back and forth between
    // secondary tabs, instead of being cleared.

    return (
      <div className={styles.common}>
        <header>
          <RelatedRecordButtonBar
            isRelatable={isRelatable}
            onCreateButtonClick={this.handleCreateButtonClick}
            onRelateButtonClick={this.handleRelateButtonClick}
          />
        </header>
        <RelatedRecordPanelContainer
          collapsed={false}
          csid={csid}
          config={config}
          linkItems={false}
          name={this.getRelatedRecordPanelName()}
          perms={perms}
          recordType={recordType}
          relatedRecordType={relatedRecordType}
          showCheckboxColumn={isRelatable}
          onItemClick={this.handleRelatedRecordClick}
          onUnrelated={this.handleRelatedRecordPanelUnrelated}
        />
        {relationEditor}
        <SearchToRelateModalContainer
          subjects={[{ csid, recordType }]}
          config={config}
          isOpen={isSearchToRelateModalOpen}
          defaultRecordTypeValue={relatedRecordType}
          onCancelButtonClick={this.handleModalCancelButtonClick}
          onCloseButtonClick={this.handleModalCloseButtonClick}
          onRelationsCreated={this.handleRelationsCreated}
        />
      </div>
    );
  }
}

RelatedRecordBrowser.propTypes = propTypes;

