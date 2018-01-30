import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import CancelButton from '../navigation/CancelButton';
import UnrelateButton from '../record/UnrelateButton';
import styles from '../../../styles/cspace-ui/ConfirmRecordUnrelateModal.css';

const messages = defineMessages({
  title: {
    id: 'confirmRecordUnrelateModal.title',
    description: 'Title of the modal shown to confirm unrelating a record.',
    defaultMessage: 'Unrelate {recordName}',
  },
  prompt: {
    id: 'confirmRecordUnrelateModal.prompt',
    description: 'The prompt shown to confirm unrelating a record.',
    defaultMessage: 'Unrelate {title} from the primary record?',
  },
  promptMultiple: {
    id: 'confirmRecordUnrelateModal.promptMultiple',
    description: 'The prompt shown to confirm unrelating multiple selected records.',
    defaultMessage: `Unrelate {recordCount, plural,
      one {the selected record}
      other {# selected records}
    } from the primary record?`,
  },
  unrelating: {
    id: 'confirmRecordUnrelateModal.unrelating',
    description: 'The message displayed in the unrelate modal when unrelating is in progress.',
    defaultMessage: 'Unrelating...',
  },
});

const propTypes = {
  config: PropTypes.object,
  data: PropTypes.instanceOf(Immutable.Map),
  isOpen: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  isUnrelating: PropTypes.bool,
  recordCount: PropTypes.number,
  recordType: PropTypes.string,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onUnrelateButtonClick: PropTypes.func,
};

const contextTypes = {
  intl: intlShape,
};

export default class ConfirmRecordUnrelateModal extends Component {
  constructor(props) {
    super(props);

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      isUnrelating,
      onCancelButtonClick,
      onUnrelateButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          disabled={isUnrelating}
          onClick={onCancelButtonClick}
        />
        <UnrelateButton
          isUnrelating={isUnrelating}
          onClick={onUnrelateButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      config,
      data,
      isMultiSelect,
      isOpen,
      isUnrelating,
      recordCount,
      recordType,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || (!isMultiSelect && !data) || (isMultiSelect && !recordCount)) {
      return null;
    }

    const {
      intl,
    } = this.context;

    const recordTypeConfig = config.recordTypes[recordType];
    const recordNameMessage = isMultiSelect ? 'collectionName' : 'name';
    const recordName = intl.formatMessage(recordTypeConfig.messages.record[recordNameMessage]);

    let content;

    if (isUnrelating) {
      content = <FormattedMessage {...messages.unrelating} />;
    } else if (isMultiSelect) {
      content = <FormattedMessage {...messages.promptMultiple} values={{ recordCount }} />;
    } else {
      const title = recordTypeConfig.title(data, { config, intl });

      content = <FormattedMessage {...messages.prompt} values={{ title }} />;
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
        {content}
      </Modal>
    );
  }
}

ConfirmRecordUnrelateModal.modalName = 'ConfirmRecordUnrelateModal';
ConfirmRecordUnrelateModal.propTypes = propTypes;
ConfirmRecordUnrelateModal.contextTypes = contextTypes;
