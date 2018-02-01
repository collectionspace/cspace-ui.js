import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import RelationButtonBar from './RelationButtonBar';
import WorkflowStateIcon from './WorkflowStateIcon';
import RecordEditorContainer from '../../containers/record/RecordEditorContainer';
import ConfirmRecordUnrelateModal from './ConfirmRecordUnrelateModal';
import { canRelate } from '../../helpers/permissionHelpers';
import { getWorkflowState } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RelationEditor.css';

export const confirmUnrelateModalName = `RelationEditor-${ConfirmRecordUnrelateModal.modalName}`;

const messages = defineMessages({
  editTitle: {
    id: 'relationEditor.editTitle',
    defaultMessage: 'Related {recordTypeName}',
  },
  newTitle: {
    id: 'relationEditor.newTitle',
    defaultMessage: 'New Related {recordTypeName}',
  },
  notFound: {
    id: 'relationEditor.notFound',
    defaultMessage: 'Not Found',
  },
  noRelation: {
    id: 'relationEditor.noRelation',
    defaultMessage: 'There is no related record with CSID "{csid}" and type "{recordType}".',
  },
});

const propTypes = {
  cloneCsid: PropTypes.string,
  config: PropTypes.object,
  perms: PropTypes.instanceOf(Immutable.Map),
  // TODO: These uses aren't properly detected. Try updating eslint-plugin-react.
  /* eslint-disable react/no-unused-prop-types */
  subject: PropTypes.shape({
    csid: PropTypes.string,
    recordType: PropTypes.string,
  }),
  subjectWorkflowState: PropTypes.string,
  object: PropTypes.shape({
    csid: PropTypes.string,
    recordType: PropTypes.string,
  }),
  /* eslint-enable react/no-unused-prop-types */
  objectData: PropTypes.instanceOf(Immutable.Map),
  objectError: PropTypes.instanceOf(Immutable.Map),
  openModalName: PropTypes.string,
  predicate: PropTypes.string,
  findResult: PropTypes.instanceOf(Immutable.Map),
  cloneRecord: PropTypes.func,
  createRelation: PropTypes.func,
  findRelation: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  unrelate: PropTypes.func,
  onClose: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onRecordTransitioned: PropTypes.func,
  onUnmount: PropTypes.func,
  onUnrelated: PropTypes.func,
};

const contextTypes = {
  intl: intlShape,
};

export default class RelationEditor extends Component {
  constructor() {
    super();

    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleConfirmUnrelateButtonClick = this.handleConfirmUnrelateButtonClick.bind(this);
    this.handleUnrelateButtonClick = this.handleUnrelateButtonClick.bind(this);
    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleRecordCreated = this.handleRecordCreated.bind(this);
    this.handleRecordTransitioned = this.handleRecordTransitioned.bind(this);
    this.handleSaveCancelled = this.handleSaveCancelled.bind(this);
  }

  componentDidMount() {
    this.initRelation();
  }

  componentDidUpdate(prevProps) {
    const {
      subject,
      object,
      predicate,
      findResult,
    } = this.props;

    const {
      subject: prevSubject,
      object: prevObject,
      predicate: prevPredicate,
      findResult: prevFindResult,
    } = prevProps;

    if (
      !isEqual(subject, prevSubject) ||
      !isEqual(object, prevObject) ||
      predicate !== prevPredicate ||
      (!findResult && prevFindResult)
    ) {
      this.initRelation();
    }
  }

  componentWillUnmount() {
    const {
      onUnmount,
    } = this.props;

    if (this.unrelateWhenUnmounted) {
      this.unrelate();
    }

    if (onUnmount) {
      onUnmount();
    }
  }

  close() {
    const {
      onClose,
    } = this.props;

    if (onClose) {
      onClose();
    }
  }

  initRelation() {
    const {
      config,
      subject,
      object,
      predicate,
      findRelation,
    } = this.props;

    if (findRelation && object.csid) {
      findRelation(config, subject, object, predicate);
    }
  }

  unrelate() {
    const {
      config,
      subject,
      object,
      predicate,
      unrelate,
      onUnrelated,
    } = this.props;

    if (unrelate) {
      unrelate(config, subject, object, predicate)
        .then(() => {
          if (onUnrelated) {
            onUnrelated(subject, object, predicate);
          }
        });
    }
  }

  handleCancelButtonClick() {
    this.close();
  }

  handleCloseButtonClick() {
    this.close();
  }

  handleConfirmUnrelateButtonClick() {
    const {
      closeModal,
    } = this.props;

    if (closeModal) {
      closeModal(false);
    }

    this.unrelateWhenUnmounted = true;

    this.close();
  }

  handleModalCancelButtonClick() {
    const {
      closeModal,
    } = this.props;

    if (closeModal) {
      closeModal(false);
    }
  }

  handleUnrelateButtonClick() {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(confirmUnrelateModalName);
    }
  }

  handleRecordCreated(newRecordCsid, isNavigating) {
    const {
      subject,
      predicate,
      createRelation,
      onRecordCreated,
    } = this.props;

    if (createRelation) {
      const object = {
        csid: newRecordCsid,
      };

      return createRelation(subject, object, predicate)
        .then(() => (onRecordCreated ? onRecordCreated(newRecordCsid, isNavigating) : null));
    }

    return null;
  }

  handleRecordTransitioned(transitionName) {
    const {
      onRecordTransitioned,
    } = this.props;

    if (transitionName === 'delete') {
      this.close();
    }

    if (onRecordTransitioned) {
      onRecordTransitioned(transitionName);
    }
  }

  handleSaveCancelled() {
    // This handles unrelating an unsaved record. The confirm navigation dialog will be shown, and
    // if it's cancelled, we shouldn't unrelate.

    this.unrelateWhenUnmounted = false;
  }

  renderHeader() {
    const {
      config,
      perms,
      subject,
      subjectWorkflowState,
      object,
      objectData,
    } = this.props;

    const {
      intl,
    } = this.context;

    const recordTypeConfig = config.recordTypes[object.recordType];
    const recordTitle = recordTypeConfig.title(objectData, { config, intl });

    const recordTypeName = (
      <FormattedMessage
        {...get(recordTypeConfig, ['messages', 'record', 'name'])}
      />
    );

    const values = {
      recordTypeName,
    };

    const title = object.csid
      ? <FormattedMessage {...messages.editTitle} values={values} />
      : <FormattedMessage {...messages.newTitle} values={values} />;

    const objectWorkflowState = getWorkflowState(objectData);
    const objectWorkflowStateIcon = <WorkflowStateIcon value={objectWorkflowState} />;

    const isUnrelatable = (
      subjectWorkflowState !== 'locked' &&
      objectWorkflowState !== 'locked' &&
      canRelate(subject.recordType, perms) &&
      canRelate(object.recordType, perms)
    );

    return (
      <header>
        <h3>{title}</h3>
        <div>
          {objectWorkflowStateIcon}
          <h1>{recordTitle}</h1>
          <RelationButtonBar
            isUnrelatable={isUnrelatable}
            object={object}
            onCancelButtonClick={this.handleCancelButtonClick}
            onCloseButtonClick={this.handleCloseButtonClick}
            onUnrelateButtonClick={this.handleUnrelateButtonClick}
          />
        </div>
      </header>
    );
  }

  renderConfirmRecordUnrelateModal() {
    const {
      config,
      object,
      objectData,
      openModalName,
    } = this.props;

    return (
      <ConfirmRecordUnrelateModal
        config={config}
        recordType={object.recordType}
        data={objectData}
        isOpen={openModalName === confirmUnrelateModalName}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onUnrelateButtonClick={this.handleConfirmUnrelateButtonClick}
      />
    );
  }

  render() {
    const {
      cloneRecord,
      cloneCsid,
      config,
      subject,
      subjectWorkflowState,
      object,
      objectError,
      findResult,
    } = this.props;

    if (object.csid) {
      if (!findResult) {
        return null;
      }

      let isObjectFound = true;

      if (objectError) {
        isObjectFound = false;
      } else {
        const list = findResult.get('rel:relations-common-list');
        const count = parseInt(list.get('totalItems'), 10);

        if (isNaN(count) || count < 1) {
          isObjectFound = false;
        }
      }

      if (!isObjectFound) {
        // There is no related object record.

        return (
          <div>
            <h1><FormattedMessage {...messages.notFound} /></h1>
            <p>
              <FormattedMessage
                {...messages.noRelation}
                values={{ csid: object.csid, recordType: object.recordType }}
              />
            </p>
          </div>
        );
      }
    }

    return (
      <div className={styles.common}>
        {this.renderHeader()}
        <RecordEditorContainer
          cloneCsid={cloneCsid}
          config={config}
          csid={object.csid}
          recordType={object.recordType}
          relatedSubjectCsid={subject.csid}
          relatedSubjectWorkflowState={subjectWorkflowState}
          clone={cloneRecord}
          onRecordCreated={this.handleRecordCreated}
          onRecordTransitioned={this.handleRecordTransitioned}
          onSaveCancelled={this.handleSaveCancelled}
        />
        {this.renderConfirmRecordUnrelateModal()}
      </div>
    );
  }
}

RelationEditor.propTypes = propTypes;
RelationEditor.contextTypes = contextTypes;
