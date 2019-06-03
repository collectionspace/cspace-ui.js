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
  initialInvocationDescriptor: PropTypes.instanceOf(Immutable.Map),
  invocationDescriptorReadOnly: PropTypes.bool,
  isOpen: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  recordType: PropTypes.oneOf(['report', 'batch']),
  readRecord: PropTypes.func,
  searchCsid: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onInvokeButtonClick: PropTypes.func,
};

export default class InvocationModal extends Component {
  constructor(props) {
    super(props);

    this.handleInvocationDescriptorCommit = this.handleInvocationDescriptorCommit.bind(this);
    this.handleInvokeButtonClick = this.handleInvokeButtonClick.bind(this);
    this.renderButtonBar = this.renderButtonBar.bind(this);

    this.state = {
      invocationDescriptor: props.initialInvocationDescriptor,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      isOpen,
    } = this.props;

    const {
      isOpen: nextIsOpen,
    } = nextProps;

    if (!isOpen && nextIsOpen) {
      this.setState({
        invocationDescriptor: nextProps.initialInvocationDescriptor,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      csid,
      isOpen,
      readRecord,
    } = this.props;

    const {
      isOpen: prevIsOpen,
    } = prevProps;

    if (csid && !prevIsOpen && isOpen) {
      if (readRecord) {
        readRecord();
      }

      this.readInvocationItem();
    }
  }

  handleInvocationDescriptorCommit(invocationDescriptor) {
    this.setState({
      invocationDescriptor,
    });
  }

  handleInvokeButtonClick() {
    const {
      data,
      onInvokeButtonClick,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    const mode = invocationDescriptor.get('mode');

    // Translate the items map to csids.

    const items = invocationDescriptor.get('items') || Immutable.Map();

    let csid = items.keySeq().toJS();

    if (mode === 'single' || mode === 'group') {
      csid = csid[0];
    }

    if (onInvokeButtonClick) {
      onInvokeButtonClick(data, invocationDescriptor.set('csid', csid));
    }
  }

  readInvocationItem() {
    const {
      config,
      searchCsid,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    if (invocationDescriptor) {
      const invocationCsid = invocationDescriptor.get('csid');

      if (
        invocationCsid
        && typeof invocationCsid === 'string'
        && !invocationDescriptor.get('items')
      ) {
        searchCsid(config, invocationDescriptor.get('recordType'), invocationCsid)
          .then((response) => {
            const item = get(response, ['data', 'ns2:abstract-common-list', 'list-item']);

            const nextInvocationDescriptor = this.state.invocationDescriptor.set(
              'items', Immutable.fromJS([item])
            );

            this.setState({
              invocationDescriptor: nextInvocationDescriptor,
            });
          });
      }
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
      invocationDescriptorReadOnly,
      isOpen,
      isRecordModified,
      recordType,
      onCloseButtonClick,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    if (!isOpen || !csid) {
      return null;
    }

    const recordTypeConfig = get(config, ['recordTypes', recordType]);
    const invocableNameGetter = get(recordTypeConfig, 'invocableName');
    const invocableName = invocableNameGetter && invocableNameGetter(data);

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
        <InvocationEditorContainer
          config={config}
          metadata={data}
          invocationDescriptor={invocationDescriptor}
          invocationDescriptorReadOnly={invocationDescriptorReadOnly}
          invocableName={invocableName}
          isInvocationTargetModified={isRecordModified}
          recordType={recordType}
          onInvocationDescriptorCommit={this.handleInvocationDescriptorCommit}
        />
      </Modal>
    );
  }
}

InvocationModal.modalName = 'InvocationModal';
InvocationModal.propTypes = propTypes;
