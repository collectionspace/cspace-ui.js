import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import CancelButton from '../navigation/CancelButton';
import ExportFieldEditorContainer from '../../containers/search/ExportFieldEditorContainer';
import ExportButton from './ExportButton';

const messages = defineMessages({
  cancel: {
    id: 'exportModal.cancel',
    description: 'Label of the cancel button in the export modal.',
    defaultMessage: 'Cancel',
  },
  export: {
    id: 'exportModal.export',
    description: 'Label of the export button in the export modal.',
    defaultMessage: 'Export',
  },
  label: {
    id: 'exportModal.label',
    defaultMessage: 'Export',
  },
  title: {
    id: 'exportModal.title',
    defaultMessage: 'Export as CSV',
  },
});

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  isOpen: PropTypes.bool,
  perms: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  selectedItems: PropTypes.instanceOf(Immutable.Map),
  vocabulary: PropTypes.string,
  openExport: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onExportOpened: PropTypes.func,
};

const defaultProps = {
  selectedItems: Immutable.Map(),
};

export default class ExportModal extends Component {
  constructor(props) {
    super(props);

    this.handleExportButtonClick = this.handleExportButtonClick.bind(this);
    this.handleIncludeFieldsAddInstance = this.handleIncludeFieldsAddInstance.bind(this);
    this.handleIncludeFieldsCommit = this.handleIncludeFieldsCommit.bind(this);
    this.handleIncludeFieldsMoveInstance = this.handleIncludeFieldsMoveInstance.bind(this);
    this.handleIncludeFieldsRemoveInstance = this.handleIncludeFieldsRemoveInstance.bind(this);
    this.renderButtonBar = this.renderButtonBar.bind(this);

    this.state = {
      invocationDescriptor: Immutable.fromJS({
        mode: 'list',
        outputMIME: 'text/csv',
        includeFields: [],
      }),
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
      this.initInvocationDescriptor(nextProps);
    }
  }

  initInvocationDescriptor(props) {
    const {
      invocationDescriptor,
    } = this.state;

    const {
      recordType,
      vocabulary,
      selectedItems,
    } = props;

    const nextInvocationDescriptor = invocationDescriptor
      .set('recordType', recordType)
      .set('vocabulary', vocabulary)
      .set('includeFields', Immutable.List())
      .set('csid', Immutable.List(selectedItems.keySeq()));

    this.setState({
      invocationDescriptor: nextInvocationDescriptor,
    });
  }

  handleIncludeFieldsAddInstance(position) {
    const {
      invocationDescriptor,
    } = this.state;

    const includeFields = invocationDescriptor.get('includeFields');

    const nextIncludeFields = (typeof position === 'undefined' || position < 0 || position >= includeFields.size)
      ? includeFields.push('')
      : includeFields.insert(position, '');

    const nextInvocationDescriptor = invocationDescriptor.set('includeFields', nextIncludeFields);

    this.setState({
      invocationDescriptor: nextInvocationDescriptor,
    });
  }

  handleIncludeFieldsCommit(position, value) {
    const {
      invocationDescriptor,
    } = this.state;

    const nextInvocationDescriptor = invocationDescriptor.setIn(['includeFields', position], value);

    this.setState({
      invocationDescriptor: nextInvocationDescriptor,
    });
  }

  handleIncludeFieldsMoveInstance(fromPosition, toPosition) {
    const {
      invocationDescriptor,
    } = this.state;

    const includeFields = invocationDescriptor.get('includeFields');
    const value = includeFields.get(fromPosition);
    const nextIncludeFields = includeFields.delete(fromPosition).insert(toPosition, value);
    const nextInvocationDescriptor = invocationDescriptor.set('includeFields', nextIncludeFields);

    this.setState({
      invocationDescriptor: nextInvocationDescriptor,
    });
  }

  handleIncludeFieldsRemoveInstance(position) {
    const {
      invocationDescriptor,
    } = this.state;

    const nextInvocationDescriptor = invocationDescriptor.deleteIn(['includeFields', position]);

    this.setState({
      invocationDescriptor: nextInvocationDescriptor,
    });
  }

  handleExportButtonClick() {
    const {
      config,
      openExport,
      onExportOpened,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    if (openExport) {
      openExport(config, invocationDescriptor)
        .then(() => {
          if (onExportOpened) {
            onExportOpened();
          }
        })
        .catch(() => {});
    }
  }

  renderButtonBar() {
    const {
      onCancelButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />

        <ExportButton
          label={<FormattedMessage {...messages.export} />}
          onClick={this.handleExportButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      config,
      isOpen,
      recordType,
      onCancelButtonClick,
      onCloseButtonClick,
    } = this.props;

    const {
      invocationDescriptor,
    } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        title={<h1><FormattedMessage {...messages.title} /></h1>}
        renderButtonBar={this.renderButtonBar}
        onCancelButtonClick={onCancelButtonClick}
        onCloseButtonClick={onCloseButtonClick}
      >
        <ExportFieldEditorContainer
          config={config}
          recordType={recordType}
          includeFields={invocationDescriptor.get('includeFields')}
          onIncludeFieldsAddInstance={this.handleIncludeFieldsAddInstance}
          onIncludeFieldsCommit={this.handleIncludeFieldsCommit}
          onIncludeFieldsMoveInstance={this.handleIncludeFieldsMoveInstance}
          onIncludeFieldsRemoveInstance={this.handleIncludeFieldsRemoveInstance}
        />
      </Modal>
    );
  }
}

ExportModal.propTypes = propTypes;
ExportModal.defaultProps = defaultProps;
