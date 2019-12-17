import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import { components as inputComponents } from 'cspace-input';
import { Modal } from 'cspace-layout';
import InvokeButton from './InvokeButton';
import InvocationEditorContainer from '../../containers/invocable/InvocationEditorContainer';
import OptionPickerInputContainer from '../../containers/record/OptionPickerInputContainer';
import { normalizeInvocationDescriptor } from '../../helpers/invocationHelpers';
import CancelButton from '../navigation/CancelButton';
import styles from '../../../styles/cspace-ui/InvocationModal.css';
import formatPickerStyles from '../../../styles/cspace-ui/InvocationFormatPicker.css';

const { Label } = inputComponents;

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
  running: {
    id: 'invocationModal.running',
    description: 'Message displayed in the invocation modal when the report/batch job is running.',
    defaultMessage: 'Running…',
  },
  format: {
    id: 'invocationModal.format',
    description: 'Label of the output format picker in the invocation modal.',
    defaultMessage: 'Format:',
  },
});

const propTypes = {
  allowedModes: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  initialInvocationDescriptor: PropTypes.instanceOf(Immutable.Map),
  modeReadOnly: PropTypes.bool,
  invocationTargetReadOnly: PropTypes.bool,
  isOpen: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  isRunning: PropTypes.bool,
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

    this.handleFormatPickerCommit = this.handleFormatPickerCommit.bind(this);
    this.handleInvocationDescriptorCommit = this.handleInvocationDescriptorCommit.bind(this);
    this.handleInvokeButtonClick = this.handleInvokeButtonClick.bind(this);
    this.renderButtonBar = this.renderButtonBar.bind(this);

    const {
      data,
      initialInvocationDescriptor,
    } = this.props;

    this.state = {
      invocationDescriptor: normalizeInvocationDescriptor(initialInvocationDescriptor, data),
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      data,
      isOpen,
    } = this.props;

    const {
      data: nextData,
      isOpen: nextIsOpen,
    } = nextProps;

    if (!isOpen && nextIsOpen) {
      const {
        initialInvocationDescriptor,
      } = nextProps;

      this.setState({
        invocationDescriptor: normalizeInvocationDescriptor(initialInvocationDescriptor, nextData),
      });
    } else if (!data && nextData) {
      const { invocationDescriptor } = this.state;

      this.setState({
        invocationDescriptor: normalizeInvocationDescriptor(invocationDescriptor, nextData),
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

  handleFormatPickerCommit(path, value) {
    const {
      invocationDescriptor,
    } = this.state;

    this.setState({
      invocationDescriptor: invocationDescriptor.set('outputMIME', value),
    });
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
      [csid] = csid;
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
            let item = get(response, ['data', 'ns2:abstract-common-list', 'list-item']);

            if (item) {
              item = Immutable.fromJS(item);
            } else {
              item = Immutable.Map({
                csid: invocationCsid,
              });
            }

            this.setState((prevState) => ({
              invocationDescriptor: prevState.invocationDescriptor.set(
                'items', Immutable.Map({ [invocationCsid]: item }),
              ),
            }));
          })
          .catch(() => {
            const item = Immutable.Map({
              csid: invocationCsid,
            });

            this.setState((prevState) => ({
              invocationDescriptor: prevState.invocationDescriptor.set(
                'items', Immutable.Map({ [invocationCsid]: item }),
              ),
            }));
          });
      }
    }
  }

  renderFormatPicker() {
    const {
      recordType,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    // TODO: Use reports/mimetypes endpoint to get options, and [recordType]/mimetypes to check if
    // a format picker should be shown instead of hardcoding (batch/mimetypes will return 404, so
    // format picker should not be shown).

    if (recordType === 'report') {
      return (
        <div className={formatPickerStyles.common}>
          <OptionPickerInputContainer
            blankable={false}
            label={<Label><FormattedMessage {...messages.format} /></Label>}
            source="reportMimeTypes"
            value={invocationDescriptor.get('outputMIME')}
            onCommit={this.handleFormatPickerCommit}
          />
        </div>
      );
    }

    return null;
  }

  renderButtonBar() {
    const {
      isRunning,
      onCancelButtonClick,
      recordType,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    const mode = invocationDescriptor.get('mode');
    const items = invocationDescriptor.get('items');

    return (
      <div>
        {this.renderFormatPicker()}

        <CancelButton
          disabled={isRunning}
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />

        <InvokeButton
          disabled={
            isRunning
            || (mode !== 'nocontext' && (!items || items.isEmpty()))
          }
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

  renderInvocationEditor() {
    const {
      allowedModes,
      config,
      data,
      modeReadOnly,
      invocationTargetReadOnly,
      isRecordModified,
      recordType,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    const recordTypeConfig = get(config, ['recordTypes', recordType]);
    const invocableNameGetter = get(recordTypeConfig, 'invocableName');
    const invocableName = invocableNameGetter && invocableNameGetter(data);

    return (
      <InvocationEditorContainer
        allowedModes={allowedModes}
        config={config}
        metadata={data}
        invocationDescriptor={invocationDescriptor}
        modeReadOnly={modeReadOnly}
        invocationTargetReadOnly={invocationTargetReadOnly}
        invocableName={invocableName}
        isInvocationTargetModified={isRecordModified}
        recordType={recordType}
        onInvocationDescriptorCommit={this.handleInvocationDescriptorCommit}
      />
    );
  }

  render() {
    const {
      csid,
      isOpen,
      isRunning,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || !csid) {
      return null;
    }

    let content;

    if (isRunning) {
      content = (
        <p>
          <FormattedMessage {...messages.running} />
        </p>
      );
    } else {
      content = this.renderInvocationEditor();
    }

    return (
      <Modal
        className={isRunning ? styles.running : styles.common}
        isOpen={isOpen}
        title={this.renderTitle()}
        closeButtonClassName="material-icons"
        closeButtonDisabled={isRunning}
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        {content}
      </Modal>
    );
  }
}

InvocationModal.propTypes = propTypes;
