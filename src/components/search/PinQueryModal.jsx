import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import { Modal } from 'cspace-layout';
import { components as inputComponents } from 'cspace-input';
import CancelButton from '../navigation/CancelButton';
import SearchPinButton from './SearchPinButton';
import styles from '../../../styles/cspace-ui/PinQueryModal.css';

const { LineInput, MultilineInput } = inputComponents;

const messages = defineMessages({
  title: {
    id: 'pinQueryModal.title',
    description: 'Title of the pin query modal.',
    defaultMessage: 'Pin Query',
  },
  name: {
    id: 'pinQueryModal.name',
    description: 'Label of the name field in the pin query modal.',
    defaultMessage: 'Name',
  },
  description: {
    id: 'pinQueryModal.description',
    description: 'Label of the description field in the pin query modal.',
    defaultMessage: 'Description',
  },
  cancel: {
    id: 'pinQueryModal.cancel',
    description: 'Label of the cancel button in the pin query modal.',
    defaultMessage: 'Cancel',
  },
});

const propTypes = {
  isOpen: PropTypes.bool,
  pinQuery: PropTypes.func,
  onQueryPinned: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
};

const contextTypes = {
  intl: intlShape,
};

export default class PinQueryModal extends Component {
  constructor(props) {
    super(props);

    this.handleDescriptionCommit = this.handleDescriptionCommit.bind(this);
    this.handleNameCommit = this.handleNameCommit.bind(this);
    this.handlePinButtonClick = this.handlePinButtonClick.bind(this);
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

  handlePinButtonClick() {
    const {
      pinQuery,
      onQueryPinned,
    } = this.props;

    const {
      name,
      description,
    } = this.state;

    if (pinQuery) {
      pinQuery(name, description);
    }

    if (onQueryPinned) {
      onQueryPinned();
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

        <SearchPinButton
          disabled={!name.trim()}
          onClick={this.handlePinButtonClick}
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

PinQueryModal.propTypes = propTypes;
PinQueryModal.contextTypes = contextTypes;
