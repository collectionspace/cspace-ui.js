import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Modal } from 'cspace-layout';
import { components as inputComponents } from 'cspace-input';
import CancelButton from '../navigation/CancelButton';
import styles from '../../../styles/cspace-ui/SavedQueriesModal.css';

const { MiniButton } = inputComponents;

const messages = defineMessages({
  title: {
    id: 'savedQueriesModal.title',
    description: 'Title of the saved queries modal.',
    defaultMessage: 'My Saved Queries',
  },
  empty: {
    id: 'savedQueriesModal.empty',
    description: 'The message shown in the saved queries modal when there are no saved queries.',
    defaultMessage: 'No saved queries.',
  },
  load: {
    id: 'savedQueriesModal.load',
    description: 'Label of the load button for a saved query in the saved queries modal.',
    defaultMessage: 'Load',
  },
  delete: {
    id: 'savedQueriesModal.delete',
    description: 'Label of the delete button for a saved query in the saved queries modal.',
    defaultMessage: 'Delete',
  },
  confirmDelete: {
    id: 'savedQueriesModal.confirmDelete',
    description: 'The prompt shown to confirm deletion of a saved query in the saved queries modal.',
    defaultMessage: 'Delete?',
  },
  confirm: {
    id: 'savedQueriesModal.confirm',
    description: 'Label of the button confirming deletion of a saved query in the saved queries modal.',
    defaultMessage: 'Confirm',
  },
  cancel: {
    id: 'savedQueriesModal.cancel',
    description: 'Label of the button canceling deletion of a saved query in the saved queries modal.',
    defaultMessage: 'Cancel',
  },
  close: {
    id: 'savedQueriesModal.close',
    description: 'Label of the close button in the saved queries modal.',
    defaultMessage: 'Close',
  },
});

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  isOpen: PropTypes.bool,
  savedQueries: PropTypes.instanceOf(Immutable.List),
  deleteQuery: PropTypes.func,
  onLoadQuery: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
};

const defaultProps = {
  savedQueries: Immutable.List(),
};

const contextTypes = {
  intl: intlShape,
};

export default class SavedQueriesModal extends Component {
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

  renderQueryActions(query) {
    const {
      onLoadQuery,
    } = this.props;

    const {
      confirmDeleteId,
    } = this.state;

    const id = query.get('id');

    if (confirmDeleteId === id) {
      return (
        <div className={styles.actions}>
          <FormattedMessage {...messages.confirmDelete} />

          <MiniButton
            autoWidth
            name="confirmDeleteQuery"
            onClick={() => this.handleConfirmDeleteButtonClick(id)}
          >
            <FormattedMessage {...messages.confirm} />
          </MiniButton>

          <MiniButton
            autoWidth
            name="cancelDeleteQuery"
            onClick={() => this.setState({ confirmDeleteId: null })}
          >
            <FormattedMessage {...messages.cancel} />
          </MiniButton>
        </div>
      );
    }

    return (
      <div className={styles.actions}>
        <MiniButton
          autoWidth
          name="loadQuery"
          onClick={() => onLoadQuery && onLoadQuery(query)}
        >
          <FormattedMessage {...messages.load} />
        </MiniButton>

        <MiniButton
          autoWidth
          name="deleteQuery"
          onClick={() => this.setState({ confirmDeleteId: id })}
        >
          <FormattedMessage {...messages.delete} />
        </MiniButton>
      </div>
    );
  }

  renderQueryList() {
    const {
      savedQueries,
    } = this.props;

    if (savedQueries.isEmpty()) {
      return <p><FormattedMessage {...messages.empty} /></p>;
    }

    return (
      <ul className={styles.queryList}>
        {savedQueries.map((query) => (
          <li key={query.get('id')}>
            <div className={styles.querySummary}>
              <strong>{query.get('name')}</strong>
              <span>{this.formatRecordTypeLabel(query.get('recordType'))}</span>
              {query.get('description') && <div>{query.get('description')}</div>}
            </div>
            {this.renderQueryActions(query)}
          </li>
        ))}
      </ul>
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
        {this.renderQueryList()}
      </Modal>
    );
  }
}

SavedQueriesModal.propTypes = propTypes;
SavedQueriesModal.defaultProps = defaultProps;
SavedQueriesModal.contextTypes = contextTypes;
