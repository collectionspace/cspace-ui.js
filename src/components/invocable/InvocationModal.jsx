import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import InvocationEditor from './InvocationEditor';
import CancelButton from '../navigation/CancelButton';
import RunButton from '../record/RunButton';

const propTypes = {
  config: PropTypes.object,
  isOpen: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  invocationItem: PropTypes.instanceOf(Immutable.Map),
  messages: PropTypes.objectOf(PropTypes.object),
  runButtonClassName: PropTypes.string,
  type: PropTypes.oneOf(['report', 'batch']),
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default class InvocationModal extends Component {
  constructor() {
    super();

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      messages,
      runButtonClassName,
      onCancelButtonClick,
      onRunButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        <RunButton
          className={runButtonClassName}
          label={<FormattedMessage {...messages.run} />}
          onClick={onRunButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      config,
      isOpen,
      isRecordModified,
      invocationItem,
      messages,
      type,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || !invocationItem) {
      return null;
    }

    let unsavedWarning;

    if (isRecordModified) {
      unsavedWarning = <p><FormattedMessage {...messages.unsaved} /></p>;
    }

    return (
      <Modal
        isOpen={isOpen}
        title={<h1>{invocationItem.get('name')}</h1>}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        {unsavedWarning}

        <InvocationEditor
          config={config}
          invocationItem={invocationItem}
          promptMessage={messages.prompt}
          type={type}
        />
      </Modal>
    );
  }
}

InvocationModal.modalName = 'InvocationModal';
InvocationModal.propTypes = propTypes;
