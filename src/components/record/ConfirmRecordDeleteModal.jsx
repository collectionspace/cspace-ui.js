import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Modal } from 'cspace-layout';
import CancelButton from '../navigation/CancelButton';
import DeleteButton from './DeleteButton';
import styles from '../../../styles/cspace-ui/ConfirmRecordDeleteModal.css';

import {
  hasHierarchyRelations,
  hasNarrowerHierarchyRelations,
} from '../../helpers/recordDataHelpers';

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
  hasUses: {
    id: 'confirmRecordDeleteModal.hasUses',
    description: 'The message shown in the confirm delete modal when the record to be deleted is an authority item that is used by other records.',
    defaultMessage: '{title} cannot be deleted because it is used by other records.',
  },
  hasRoleUses: {
    id: 'confirmRecordDeleteModal.hasRoleUses',
    description: 'The message shown in the confirm delete modal when the record to be deleted is a role that is used by user accounts.',
    defaultMessage: '{title} cannot be deleted because it is associated with user accounts.',
  },
  hasHierarchy: {
    id: 'confirmRecordDeleteModal.hasHierarchy',
    description: 'The message shown in the confirm delete modal when the record to be deleted has broader or narrower relations.',
    defaultMessage: '{title} cannot be deleted because it belongs to a hierarchy. To delete this record, first remove its broader and narrower records.',
  },
  hasNarrowerHierarchy: {
    id: 'confirmRecordDeleteModal.hasNarrowerHierarchy',
    description: 'The message shown in the confirm delete modal when deletion of records with broader relations is allowed, but the record to be deleted has narrower relations.',
    defaultMessage: '{title} cannot be deleted because it is a broader record in a hierarchy. To delete this record, first remove its narrower records.',
  },
});

const propTypes = {
  config: PropTypes.shape({
    allowDeleteHierarchyLeaves: PropTypes.bool,
    recordTypes: PropTypes.object,
  }),
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  isOpen: PropTypes.bool,
  isSavePending: PropTypes.bool,
  recordType: PropTypes.string,
  /* eslint-disable react/no-unused-prop-types */
  // These actually are used, but not detected by eslint.
  checkForRelations: PropTypes.func,
  checkForUses: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */
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

    this.state = {};
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const {
      isOpen,
    } = this.props;

    if (isOpen) {
      this.init(this.props);
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate(nextProps) {
    const {
      isOpen,
    } = this.props;

    const {
      isOpen: nextIsOpen,
    } = nextProps;

    if (!isOpen && nextIsOpen) {
      this.init(nextProps);
    }
  }

  canDeleteFromHierarchy() {
    const {
      config,
      csid,
      data,
    } = this.props;

    const { allowDeleteHierarchyLeaves } = config;

    // If allowDeleteHierarchyLeaves is true, only disallow deleting records that have narrower
    // relations. Otherwise, disallow deleting records that have any (either broader or narrower)
    // hierarchy relations.

    return (
      allowDeleteHierarchyLeaves
        ? !hasNarrowerHierarchyRelations(csid, data)
        : !hasHierarchyRelations(data)
    );
  }

  init(props) {
    // On open check if the record has relations.

    const {
      config,
      recordType,
      checkForRelations,
      checkForUses,
      checkForRoleUses,
    } = props;

    const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);

    if ((serviceType === 'procedure' || serviceType === 'object') && checkForRelations) {
      this.setState({
        hasRelations: undefined,
        hasUses: false,
      });

      checkForRelations('affects')
        .then((hasRelations) => {
          this.setState({
            hasRelations,
          });
        });
    } else if (serviceType === 'authority' && checkForUses) {
      this.setState({
        hasRelations: false,
        hasUses: undefined,
      });

      checkForUses()
        .then((hasUses) => {
          this.setState({
            hasUses,
          });
        });
    } else if (recordType === 'authrole' && checkForRoleUses) {
      this.setState({
        hasRelations: false,
        hasUses: undefined,
      });

      checkForRoleUses()
        .then((hasUses) => {
          this.setState({
            hasUses,
          });
        });
    } else {
      this.setState({
        hasRelations: false,
        hasUses: false,
      });
    }
  }

  renderButtonBar() {
    const {
      csid,
      isSavePending,
      onCancelButtonClick,
      onDeleteButtonClick,
    } = this.props;

    const {
      hasRelations,
      hasUses,
    } = this.state;

    let deleteButton;

    if (!hasUses && this.canDeleteFromHierarchy()) {
      deleteButton = (
        <DeleteButton
          csid={csid}
          // Disable the delete button while the check for relations is pending.
          disabled={typeof hasRelations === 'undefined'}
          // Assume the record is deletable if this modal is being shown.
          isDeletable
          isSavePending={isSavePending}
          onClick={onDeleteButtonClick}
        />
      );
    }

    return (
      <div>
        <CancelButton
          disabled={isSavePending}
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
      hasUses,
    } = this.state;

    const { allowDeleteHierarchyLeaves, recordTypes } = config;
    const recordTypeConfig = recordTypes[recordType];
    const recordName = intl.formatMessage(recordTypeConfig.messages.record.name);
    const title = recordTypeConfig.title(data, { config, intl });

    let prompt;
    let hasRelationsMessage;
    let hasHierarchyMessage;
    let hasUsesMessage;

    if (typeof hasRelations !== 'undefined' && typeof hasUses !== 'undefined') {
      if (!this.canDeleteFromHierarchy()) {
        hasHierarchyMessage = allowDeleteHierarchyLeaves
          ? <FormattedMessage {...messages.hasNarrowerHierarchy} values={{ title }} />
          : <FormattedMessage {...messages.hasHierarchy} values={{ title }} />;
      } else if (hasUses) {
        hasUsesMessage = (recordType === 'authrole')
          ? <FormattedMessage {...messages.hasRoleUses} values={{ title }} />
          : <FormattedMessage {...messages.hasUses} values={{ title }} />;
      } else {
        prompt = <FormattedMessage {...messages.prompt} values={{ title }} />;

        hasRelationsMessage = hasRelations
          ? (
            <div>
              <br />
              <FormattedMessage {...messages.hasRelations} />
            </div>
          )
          : null;
      }
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
        {hasUsesMessage}
      </Modal>
    );
  }
}

ConfirmRecordDeleteModal.propTypes = propTypes;
ConfirmRecordDeleteModal.contextTypes = contextTypes;
