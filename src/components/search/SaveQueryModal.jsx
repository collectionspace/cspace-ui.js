import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import { Modal } from 'cspace-layout';
import { components as inputComponents } from 'cspace-input';
import CancelButton from '../navigation/CancelButton';
import SearchSaveButton from './SearchSaveButton';
import styles from '../../../styles/cspace-ui/SaveQueryModal.css';

const { LineInput, MultilineInput } = inputComponents;

const messages = defineMessages({
  title: {
    id: 'saveQueryModal.title',
    description: 'Title of the save query modal.',
    defaultMessage: 'Save Query',
  },
  name: {
    id: 'saveQueryModal.name',
    description: 'Label of the name field in the save query modal.',
    defaultMessage: 'Name',
  },
  description: {
    id: 'saveQueryModal.description',
    description: 'Label of the description field in the save query modal.',
    defaultMessage: 'Description',
  },
  cancel: {
    id: 'saveQueryModal.cancel',
    description: 'Label of the cancel button in the save query modal.',
    defaultMessage: 'Cancel',
  },
});

const propTypes = {
  isOpen: PropTypes.bool,
  saveQuery: PropTypes.func,
  onQuerySaved: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
};

const contextTypes = {
  intl: intlShape,
};

export default class SaveQueryModal extends Component {
  constructor(props) {
    super(props);

    this.handleDescriptionCommit = this.handleDescriptionCommit.bind(this);
    this.handleNameCommit = this.handleNameCommit.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.renderButtonBar = this.renderButtonBar.bind(this);

    this.state = {
      name: '',
      description: '',
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
        name: '',
        description: '',
      });
    }
  }

  handleNameCommit(path, value) {
    this.setState({
      name: value || '',
    });
  }

  handleDescriptionCommit(path, value) {
    this.setState({
      description: value || '',
    });
  }

  handleSaveButtonClick() {
    const {
      saveQuery,
      onQuerySaved,
    } = this.props;

    const {
      name,
      description,
    } = this.state;

    if (saveQuery) {
      saveQuery(name, description);
    }

    if (onQuerySaved) {
      onQuerySaved();
    }
  }

  renderButtonBar() {
    const {
      onCancelButtonClick,
    } = this.props;

    const {
      name,
    } = this.state;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />

        <SearchSaveButton
          disabled={!name.trim()}
          onClick={this.handleSaveButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      isOpen,
      onCloseButtonClick,
    } = this.props;

    const {
      name,
      description,
    } = this.state;

    const {
      intl,
    } = this.context;

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
        <LineInput
          label={intl.formatMessage(messages.name)}
          value={name}
          onCommit={this.handleNameCommit}
        />

        <MultilineInput
          label={intl.formatMessage(messages.description)}
          value={description}
          onCommit={this.handleDescriptionCommit}
        />
      </Modal>
    );
  }
}

SaveQueryModal.propTypes = propTypes;
SaveQueryModal.contextTypes = contextTypes;
