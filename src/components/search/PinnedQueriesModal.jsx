import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Modal } from 'cspace-layout';
import { components as inputComponents } from 'cspace-input';
import CancelButton from '../navigation/CancelButton';
import searchTableStyles from '../../../styles/cspace-ui/SearchTable.css';
import styles from '../../../styles/cspace-ui/PinnedQueriesModal.css';

const { MiniButton } = inputComponents;

const messages = defineMessages({
  title: {
    id: 'pinnedQueriesModal.title',
    description: 'Title of the pinned queries modal.',
    defaultMessage: 'Pinned Queries',
  },
  empty: {
    id: 'pinnedQueriesModal.empty',
    description: 'The message shown in the pinned queries modal when there are no pinned queries.',
    defaultMessage: 'No pinned queries.',
  },
  nameColumn: {
    id: 'pinnedQueriesModal.column.name',
    description: 'Label of the name column in the pinned queries modal.',
    defaultMessage: 'Name',
  },
  typeColumn: {
    id: 'pinnedQueriesModal.column.type',
    description: 'Label of the record type column in the pinned queries modal.',
    defaultMessage: 'Type',
  },
  descriptionColumn: {
    id: 'pinnedQueriesModal.column.description',
    description: 'Label of the description column in the pinned queries modal.',
    defaultMessage: 'Description',
  },
  delete: {
    id: 'pinnedQueriesModal.delete',
    description: 'Label of the delete button for a pinned query in the pinned queries modal.',
    defaultMessage: 'Delete',
  },
  confirmDelete: {
    id: 'pinnedQueriesModal.confirmDelete',
    description: 'The prompt shown to confirm deletion of a pinned query in the pinned queries modal.',
    defaultMessage: 'Delete?',
  },
  confirm: {
    id: 'pinnedQueriesModal.confirm',
    description: 'Label of the button confirming deletion of a pinned query in the pinned queries modal.',
    defaultMessage: 'Confirm',
  },
  cancel: {
    id: 'pinnedQueriesModal.cancel',
    description: 'Label of the button canceling deletion of a pinned query in the pinned queries modal.',
    defaultMessage: 'Cancel',
  },
  close: {
    id: 'pinnedQueriesModal.close',
    description: 'Label of the close button in the pinned queries modal.',
    defaultMessage: 'Close',
  },
  execute: {
    id: 'pinnedQueriesModal.execute',
    description: 'The tooltip shown when hovering a pinned query row that can be loaded.',
    defaultMessage: 'Click to execute',
  },
  deviceNote: {
    id: 'pinnedQueriesModal.deviceNote',
    description: 'The note shown in the pinned queries modal explaining that pinned queries are stored per device and browser.',
    defaultMessage: 'Currently, pinned queries are available from the same device and browser combination. Please see the {userManualLink} for additional information.',
  },
  userManual: {
    id: 'pinnedQueriesModal.userManual',
    description: 'The text of the user manual link in the pinned queries modal.',
    defaultMessage: 'User Manual',
  },
  userManualUrl: {
    id: 'pinnedQueriesModal.userManualUrl',
    description: 'The URL of the user manual page describing Pinned Queries.',
    defaultMessage: 'https://collectionspace.atlassian.net/wiki/spaces/CO/overview',
  },
});

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  isOpen: PropTypes.bool,
  pinnedQueries: PropTypes.instanceOf(Immutable.List),
  deleteQuery: PropTypes.func,
  onLoadQuery: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
};

const defaultProps = {
  pinnedQueries: Immutable.List(),
};

const contextTypes = {
  intl: intlShape,
};

const renderEmpty = () => (
  <div className={styles.empty}>
    <FormattedMessage {...messages.empty} />
  </div>
);

export default class PinnedQueriesModal extends Component {
  constructor(props) {
    super(props);

    this.renderButtonBar = this.renderButtonBar.bind(this);

    this.state = {
      confirmDeleteId: null,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      isOpen,
    } = this.props;

    const {
      isOpen: nextIsOpen,
    } = nextProps;

    if (!isOpen && nextIsOpen) {
      this.setState({
        confirmDeleteId: null,
      });
    }
  }

  handleConfirmDeleteButtonClick(id) {
    const {
      deleteQuery,
    } = this.props;

    if (deleteQuery) {
      deleteQuery(id);
    }

    this.setState({
      confirmDeleteId: null,
    });
  }

  handleLoadQuery(query) {
    const {
      onLoadQuery,
    } = this.props;

    if (onLoadQuery && this.isRecordTypeKnown(query)) {
      onLoadQuery(query);
    }
  }

  handleRowKeyDown(event, query) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleLoadQuery(query);
    }
  }

  isRecordTypeKnown(query) {
    const {
      config,
    } = this.props;

    return !!get(config, ['recordTypes', query.get('recordType')]);
  }

  formatRecordTypeLabel(recordType) {
    const {
      config,
    } = this.props;

    const {
      intl,
    } = this.context;

    const collectionNameMessage = get(
      config, ['recordTypes', recordType, 'messages', 'record', 'collectionName'],
    );

    if (collectionNameMessage) {
      return intl.formatMessage(collectionNameMessage);
    }

    return recordType;
  }

  renderActionsCell(query) {
    const {
      confirmDeleteId,
    } = this.state;

    const {
      intl,
    } = this.context;

    const id = query.get('id');

    if (confirmDeleteId === id) {
      return (
        <div className={styles.actions}>
          <FormattedMessage {...messages.confirmDelete} />

          <MiniButton
            aria-label={intl.formatMessage(messages.confirm)}
            name="confirmDeleteQuery"
            title={intl.formatMessage(messages.confirm)}
            onClick={(event) => {
              event.stopPropagation();
              this.handleConfirmDeleteButtonClick(id);
            }}
          >
            ✓
          </MiniButton>

          <MiniButton
            aria-label={intl.formatMessage(messages.cancel)}
            name="cancelDeleteQuery"
            title={intl.formatMessage(messages.cancel)}
            onClick={(event) => {
              event.stopPropagation();
              this.setState({ confirmDeleteId: null });
            }}
          >
            ✕
          </MiniButton>
        </div>
      );
    }

    return (
      <div className={styles.actions}>
        <MiniButton
          aria-label={intl.formatMessage(messages.delete)}
          name="deleteQuery"
          title={intl.formatMessage(messages.delete)}
          onClick={(event) => {
            event.stopPropagation();
            this.setState({ confirmDeleteId: id });
          }}
        >
          −
        </MiniButton>
      </div>
    );
  }

  renderQueryRow(query, index) {
    const {
      intl,
    } = this.context;

    const executable = this.isRecordTypeKnown(query);

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
    return (
      <tr
        className={index % 2 === 0 ? searchTableStyles.even : searchTableStyles.odd}
        key={query.get('id')}
        tabIndex={0}
        title={executable ? intl.formatMessage(messages.execute) : undefined}
        onClick={() => this.handleLoadQuery(query)}
        onKeyDown={(event) => this.handleRowKeyDown(event, query)}
      >
        <td>{query.get('name')}</td>
        <td>{this.formatRecordTypeLabel(query.get('recordType'))}</td>
        <td>{query.get('description')}</td>
        <td>{this.renderActionsCell(query)}</td>
      </tr>
    );
    /* eslint-enable */
  }

  renderQueryTable() {
    const {
      pinnedQueries,
    } = this.props;

    const {
      intl,
    } = this.context;

    if (pinnedQueries.isEmpty()) {
      return renderEmpty();
    }

    return (
      <div className={`${searchTableStyles.results} ${styles.tableContainer}`}>
        <table className={styles.queryTable}>
          <thead>
            <tr>
              <th scope="col">{intl.formatMessage(messages.nameColumn)}</th>
              <th scope="col">{intl.formatMessage(messages.typeColumn)}</th>
              <th scope="col">{intl.formatMessage(messages.descriptionColumn)}</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {pinnedQueries.map((query, index) => this.renderQueryRow(query, index)).toArray()}
          </tbody>
        </table>
      </div>
    );
  }

  renderDeviceNote() {
    const {
      intl,
    } = this.context;

    return (
      <p className={styles.note}>
        <FormattedMessage
          {...messages.deviceNote}
          values={{
            userManualLink: (
              <a href={intl.formatMessage(messages.userManualUrl)} rel="noreferrer" target="_blank">
                <FormattedMessage {...messages.userManual} />
              </a>
            ),
          }}
        />
      </p>
    );
  }

  renderButtonBar() {
    const {
      onCloseButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.close} />}
          onClick={onCloseButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      isOpen,
      onCloseButtonClick,
    } = this.props;

    return (
      <Modal
        className={styles.common}
        isOpen={isOpen}
        title={<h1><FormattedMessage {...messages.title} /></h1>}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        {this.renderQueryTable()}
        {this.renderDeviceNote()}
      </Modal>
    );
  }
}

PinnedQueriesModal.propTypes = propTypes;
PinnedQueriesModal.defaultProps = defaultProps;
PinnedQueriesModal.contextTypes = contextTypes;
