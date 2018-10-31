/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import RecordButtonBar from './RecordButtonBar';
import RecordFormSelector from './RecordFormSelector';
import RecordHistory from './RecordHistory';
import styles from '../../../styles/cspace-ui/RecordHeader.css';

const propTypes = {
  config: PropTypes.object,
  data: PropTypes.instanceOf(Immutable.Map),
  dockTop: PropTypes.number,
  formName: PropTypes.string,
  isCloneable: PropTypes.bool,
  isDeletable: PropTypes.bool,
  isDeprecatable: PropTypes.bool,
  isUndeprecatable: PropTypes.bool,
  isModified: PropTypes.bool,
  isReadPending: PropTypes.bool,
  isSavePending: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string.isRequired,
  showDeprecationButtons: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCloneButtonClick: PropTypes.func,
  onCommit: PropTypes.func,
  onDeprecateButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
  onUndeprecateButtonClick: PropTypes.func,
};

const defaultProps = {
  isSidebarOpen: true,
};

export default class RecordHeader extends Component {
  constructor(props) {
    super(props);
    this.setDomNode = this.setDomNode.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      docked: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleScroll() {
    const node = this.domNode;

    if (!node) return;

    const {
      dockTop,
    } = this.props;

    if (this.state.docked) {
      if ((window.scrollY + dockTop) < node.offsetTop) {
        this.setState({
          docked: false,
        });
      }
    } else if ((window.scrollY + dockTop) >= node.offsetTop) {
      this.setState({
        docked: true,
      });
    }
  }

  render() {
    const {
      config,
      data,
      dockTop,
      formName,
      isCloneable,
      isDeletable,
      isDeprecatable,
      isUndeprecatable,
      isModified,
      isReadPending,
      isSavePending,
      isSidebarOpen,
      readOnly,
      recordType,
      showDeprecationButtons,
      validationErrors,
      onCloneButtonClick,
      onCommit,
      onDeprecateButtonClick,
      onDeleteButtonClick,
      onRevertButtonClick,
      onSaveButtonClick,
      onSaveButtonErrorBadgeClick,
      onUndeprecateButtonClick,
    } = this.props;

    const {
      docked,
    } = this.state;

    const className = classNames(
      isSidebarOpen ? styles.normal : styles.full,
      { [styles.docked]: docked }
    );

    const inlineStyle = docked
      ? { height: this.domNode.offsetHeight }
      : {};

    const innerInlineStyle = docked
      ? { top: (dockTop || 0) }
      : {};

    return (
      <header
        className={className}
        style={inlineStyle}
        ref={this.setDomNode}
      >
        <div style={innerInlineStyle}>
          <RecordButtonBar
            isCloneable={isCloneable}
            isDeletable={isDeletable}
            isDeprecatable={isDeprecatable}
            isUndeprecatable={isUndeprecatable}
            isModified={isModified}
            isReadPending={isReadPending}
            isSavePending={isSavePending}
            readOnly={readOnly}
            showDeprecationButtons={showDeprecationButtons}
            validationErrors={validationErrors}
            onCloneButtonClick={onCloneButtonClick}
            onDeprecateButtonClick={onDeprecateButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            onRevertButtonClick={onRevertButtonClick}
            onSaveButtonClick={onSaveButtonClick}
            onSaveButtonErrorBadgeClick={onSaveButtonErrorBadgeClick}
            onUndeprecateButtonClick={onUndeprecateButtonClick}
          />
          <RecordFormSelector
            config={config}
            formName={formName}
            recordType={recordType}
            onCommit={onCommit}
          />
          <RecordHistory
            data={data}
            isModified={isModified}
            isSavePending={isSavePending}
          />
        </div>
      </header>
    );
  }
}

RecordHeader.propTypes = propTypes;
RecordHeader.defaultProps = defaultProps;
