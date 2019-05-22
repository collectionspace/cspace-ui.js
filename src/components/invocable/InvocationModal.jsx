import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { Modal } from 'cspace-layout';
import InvokeButton from './InvokeButton';
import InvocationEditorContainer from '../../containers/invocable/InvocationEditorContainer';
import CancelButton from '../navigation/CancelButton';
import styles from '../../../styles/cspace-ui/InvocationModal.css';

const messages = defineMessages({
  cancel: {
    id: 'invocationModal.cancel',
    description: 'Label of the cancel button in the invocation modal.',
    defaultMessage: 'Cancel',
  },
  invoke: {
    id: 'invocationModal.run',
    description: 'Label of the invoke button in the invocation modal.',
    defaultMessage: 'Run',
  },
});

const propTypes = {
  config: PropTypes.object.isRequired,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  initialInvocationDescriptor: PropTypes.shape({
    csid: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    recordType: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  recordType: PropTypes.oneOf(['report', 'batch']),
  readRecord: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onInvokeButtonClick: PropTypes.func,
};

export default class InvocationModal extends Component {
  constructor() {
    super();

    this.handleInvokeButtonClick = this.handleInvokeButtonClick.bind(this);
    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      csid,
      isOpen,
      readRecord,
    } = this.props;

    const {
      csid: prevCsid,
    } = prevProps;

    if (csid && (csid !== prevCsid) && isOpen && readRecord) {
      readRecord();
    }
  }

  handleInvokeButtonClick() {
    const {
      data,
      initialInvocationDescriptor,
      onInvokeButtonClick,
    } = this.props;

    if (onInvokeButtonClick) {
      onInvokeButtonClick(data, initialInvocationDescriptor);
    }
  }

  renderButtonBar() {
    const {
      onCancelButtonClick,
      recordType,
    } = this.props;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />

        <InvokeButton
          label={<FormattedMessage {...messages.invoke} />}
          recordType={recordType}
          onClick={this.handleInvokeButtonClick}
        />
      </div>
    );
  }

  renderTitle() {
    const {
      config,
      data,
      recordType,
    } = this.props;

    if (!data) {
      return ' ';
    }

    const recordTypeConfig = get(config, ['recordTypes', recordType]);
    const titleGetter = get(recordTypeConfig, 'title');

    let title = (titleGetter && titleGetter(data));

    if (!title) {
      const recordTypeMessages = get(recordTypeConfig, ['messages', 'record']);

      title = <FormattedMessage {...recordTypeMessages.name} />;
    }

    return (
      <h1>{title}</h1>
    );
  }

  render() {
    const {
      config,
      csid,
      data,
      isOpen,
      isRecordModified,
      recordType,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || !csid) {
      return null;
    }

    const recordTypeConfig = get(config, ['recordTypes', recordType]);
    const recordTypeMessages = get(recordTypeConfig, ['messages', 'record']);

    const invocableNameGetter = get(recordTypeConfig, 'invocableName');
    const invocableName = invocableNameGetter && invocableNameGetter(data);

    let unsavedWarning;

    if (isRecordModified) {
      unsavedWarning = <p><FormattedMessage {...recordTypeMessages.invokeUnsaved} /></p>;
    }

    return (
      <Modal
        className={styles.common}
        isOpen={isOpen}
        title={this.renderTitle()}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        {unsavedWarning}

        <InvocationEditorContainer
          config={config}
          metadata={data}
          invocableName={invocableName}
          recordType={recordType}
        />
      </Modal>
    );
  }
}

InvocationModal.modalName = 'InvocationModal';
InvocationModal.propTypes = propTypes;
