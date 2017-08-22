/* global window */

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import RecordButtonBar from './RecordButtonBar';
import RecordFormSelector from './RecordFormSelector';
import RecordHistory from './RecordHistory';
import styles from '../../../styles/cspace-ui/RecordHeader.css';

const propTypes = {
  config: PropTypes.object,
  csid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  recordType: PropTypes.string.isRequired,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCommit: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onCloneButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
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

    if (this.state.docked) {
      if (window.scrollY < 136) {
        this.setState({
          docked: false,
        });
      }
    } else if (window.scrollY >= 136) {
      this.setState({
        docked: true,
      });
    }
  }

  render() {
    const {
      config,
      csid,
      data,
      formName,
      isModified,
      isSavePending,
      recordType,
      validationErrors,
      onCommit,
      onSaveButtonClick,
      onSaveButtonErrorBadgeClick,
      onRevertButtonClick,
      onCloneButtonClick,
      onDeleteButtonClick,
    } = this.props;

    const {
      docked,
    } = this.state;

    const className = classNames(docked ? styles.docked : '');

    return (
      <div
        className={styles.common}
      >
        <header>
          <div
            className={className}
            ref={this.setDomNode}
          >
            <RecordButtonBar
              csid={csid}
              isModified={isModified}
              isSavePending={isSavePending}
              validationErrors={validationErrors}
              onSaveButtonClick={onSaveButtonClick}
              onSaveButtonErrorBadgeClick={onSaveButtonErrorBadgeClick}
              onRevertButtonClick={onRevertButtonClick}
              onCloneButtonClick={onCloneButtonClick}
              onDeleteButtonClick={onDeleteButtonClick}
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
      </div>
    );
  }
}

RecordHeader.propTypes = propTypes;
