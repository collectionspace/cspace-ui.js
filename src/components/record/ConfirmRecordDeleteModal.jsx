import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Modal } from 'cspace-layout';
import { hasHierarchyRelations } from '../../helpers/recordDataHelpers';
import CancelButton from '../navigation/CancelButton';
import DeleteButton from '../record/DeleteButton';
import styles from '../../../styles/cspace-ui/ConfirmRecordDeleteModal.css';

const messages = defineMessages({
  title: {
    id: 'confirmRecordDeleteModal.title',
    description: 'Title of the modal shown to confirm deletion of a record.',
    defaultMessage: 'Delete {recordName}',
  },
  prompt: {
    id: 'confirmRecordDeleteModal.prompt',
    description: 'The prompt shown to confirm deletion of a record.',
    defaultMessage: 'Delete {title}?',
  },
  hasRelations: {
    id: 'confirmRecordDeleteModal.hasRelations',
    description: 'The message shown in the confirm delete modal when the record to be deleted is related to other records.',
    defaultMessage: 'This record is related to other records. Deleting this record will cause those relationships to be lost.',
  },
  hasHierarchy: {
    id: 'confirmRecordDeleteModal.hasHierarchy',
    description: 'The message shown in the confirm delete modal when the record to be deleted has hierarchy (broader/narrower) relations.',
    defaultMessage: '{title} cannot be deleted because it belongs to a hierarchy. To delete this record, first remove its broader and narrower records.',
  },
  cancel: {
    id: 'confirmRecordDeleteModal.cancel',
    description: 'Label of the cancel button in the confirm delete modal.',
    defaultMessage: 'Cancel',
  },
  delete: {
    id: 'confirmRecordDeleteModal.delete',
    description: 'Label of the save button in the confirm delete modal.',
    defaultMessage: 'Delete',
  },
});

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  isOpen: PropTypes.bool,
  isSavePending: PropTypes.bool,
  recordType: PropTypes.string,
  checkForRelations: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
};

const contextTypes = {
  intl: intlShape,
};

export default class ConfirmRecordDeleteModal extends Component {
  constructor(props) {
    super(props);

    this.renderButtonBar = this.renderButtonBar.bind(this);

    const {
      config,
      recordType,
    } = this.props;

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

    this.state = {
      hasRelations: (serviceType === 'procedure' || serviceType === 'object') ? undefined : false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      // On open check if the record has relations.

      const {
        config,
        recordType,
        checkForRelations,
      } = this.props;

      if (checkForRelations) {
        const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

        if (serviceType === 'procedure' || serviceType === 'object') {
          checkForRelations('affects')
            .then((hasRelations) => {
              this.setState({
                hasRelations,
              });
            });
        }
      }
    }
  }

  renderButtonBar() {
    const {
      csid,
      data,
      isSavePending,
      onCancelButtonClick,
      onDeleteButtonClick,
    } = this.props;

    const {
      hasRelations,
    } = this.state;

    let deleteButton;

    if (!hasHierarchyRelations(data)) {
      deleteButton = (
        <DeleteButton
          csid={csid}
          // Disable the delete button while the check for relations is pending.
          disabled={typeof hasRelations === 'undefined'}
          // Assume the record is deletable if this modal is being shown.
          isDeletable
          isSavePending={isSavePending}
          label={<FormattedMessage {...messages.delete} />}
          onClick={onDeleteButtonClick}
        />
      );
    }

    return (
      <div>
        <CancelButton
          disabled={isSavePending}
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        {deleteButton}
      </div>
    );
  }

  render() {
    const {
      config,
      data,
      isOpen,
      recordType,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || !data) {
      return null;
    }

    const {
      intl,
    } = this.context;

    const {
      hasRelations,
    } = this.state;

    const recordTypeConfig = config.recordTypes[recordType];
    const recordName = intl.formatMessage(recordTypeConfig.messages.record.name);
    const title = recordTypeConfig.title(data, { config, intl });

    let prompt;
    let hasRelationsMessage;
    let hasHierarchyMessage;

    if (hasHierarchyRelations(data)) {
      hasHierarchyMessage = <FormattedMessage {...messages.hasHierarchy} values={{ title }} />;
    } else {
      prompt = <FormattedMessage {...messages.prompt} values={{ title }} />;

      hasRelationsMessage = hasRelations
        ? <div><br /><FormattedMessage {...messages.hasRelations} /></div>
        : null;
    }

    return (
      <Modal
        className={styles.common}
        isOpen={isOpen}
        title={<h1><FormattedMessage {...messages.title} values={{ recordName }} /></h1>}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        {prompt}
        {hasRelationsMessage}
        {hasHierarchyMessage}
      </Modal>
    );
  }
}

ConfirmRecordDeleteModal.modalName = 'ConfirmRecordDeleteModal';
ConfirmRecordDeleteModal.propTypes = propTypes;
ConfirmRecordDeleteModal.contextTypes = contextTypes;
