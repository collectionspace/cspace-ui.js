import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchToSelectModalContainer from '../../containers/search/SearchToSelectModalContainer';
import InvocationTargetInput from './InvocationTargetInput';
import ModePickerInput from './ModePickerInput';
import styles from '../../../styles/cspace-ui/InvocationDescriptorEditor.css';

const initMode = (props) => {
  const {
    invocationDescriptor,
    modes,
    onCommit,
  } = props;

  const mode = invocationDescriptor && invocationDescriptor.get('mode');

  if (
    (!mode || !modes.includes(mode))
    && modes.length > 0
    && onCommit
  ) {
    onCommit(invocationDescriptor.set('mode', modes[0]));
  }
};

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  invocationDescriptor: PropTypes.instanceOf(Immutable.Map),
  modes: PropTypes.arrayOf(PropTypes.string),
  modeReadOnly: PropTypes.bool,
  invocationTargetReadOnly: PropTypes.bool,
  recordTypes: PropTypes.arrayOf(PropTypes.string),
  onCommit: PropTypes.func,
};

const defaultProps = {
  invocationDescriptor: Immutable.Map(),
  modes: [],
};

export default class InvocationDescriptorEditor extends Component {
  constructor(props) {
    super(props);

    this.handleModePickerCommit = this.handleModePickerCommit.bind(this);
    this.handleSearchModalAccept = this.handleSearchModalAccept.bind(this);
    this.handleSearchModalCancelButtonClick = this.handleSearchModalCancelButtonClick.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this);

    this.state = {
      isSearchModalOpen: false,
    };
  }

  componentDidMount() {
    initMode(this.props);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    initMode(nextProps);
  }

  handleSearchModalAccept(selectedItems, searchDescriptor) {
    const {
      invocationDescriptor,
      onCommit,
    } = this.props;

    if (onCommit) {
      onCommit(
        invocationDescriptor
          .set('recordType', searchDescriptor.get('recordType'))
          .set('items', selectedItems),
      );
    }

    this.setState({
      isSearchModalOpen: false,
    });
  }

  handleSearchModalCancelButtonClick() {
    this.setState({
      isSearchModalOpen: false,
    });
  }

  handleModePickerCommit(path, value) {
    const {
      invocationDescriptor,
      invocationTargetReadOnly,
      onCommit,
    } = this.props;

    if (onCommit) {
      let nextInvocationDescriptor = invocationDescriptor.set('mode', value);

      if (!invocationTargetReadOnly) {
        nextInvocationDescriptor = nextInvocationDescriptor
          .delete('csid')
          .delete('recordType')
          .delete('items');
      }

      onCommit(nextInvocationDescriptor);
    }
  }

  openSearchModal() {
    this.setState({
      isSearchModalOpen: true,
    });
  }

  render() {
    const {
      config,
      invocationDescriptor,
      modes,
      modeReadOnly,
      invocationTargetReadOnly,
      recordTypes,
    } = this.props;

    const {
      isSearchModalOpen,
    } = this.state;

    const mode = invocationDescriptor.get('mode');
    const recordType = invocationDescriptor.get('recordType');
    const allowedRecordTypes = (mode === 'group') ? ['group'] : recordTypes;

    return (
      <div className={styles.common}>
        <div>
          <ModePickerInput
            modes={modes}
            readOnly={modeReadOnly || modes.length < 2}
            value={mode}
            onCommit={this.handleModePickerCommit}
          />

          <InvocationTargetInput
            config={config}
            mode={mode}
            readOnly={invocationTargetReadOnly}
            openSearchModal={this.openSearchModal}
            value={invocationDescriptor.get('items')}
          />
        </div>

        <SearchToSelectModalContainer
          allowedRecordTypes={allowedRecordTypes}
          config={config}
          isOpen={isSearchModalOpen}
          recordTypeValue={recordType}
          singleSelect={mode === 'single' || mode === 'group'}
          onAccept={this.handleSearchModalAccept}
          onCancelButtonClick={this.handleSearchModalCancelButtonClick}
          onCloseButtonClick={this.handleSearchModalCancelButtonClick}
        />
      </div>
    );
  }
}

InvocationDescriptorEditor.propTypes = propTypes;
InvocationDescriptorEditor.defaultProps = defaultProps;
