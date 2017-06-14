/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedTime } from 'react-intl';
import MiniCloseButton from '../record/MiniCloseButton';
import styles from '../../../styles/cspace-ui/Notification.css';


const propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.objectOf(PropTypes.string),
  values: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.instanceOf(Date),
  status: PropTypes.string,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node,
  close: PropTypes.func,
};

const defaultProps = {
  autoCloseTime: 5000, // ms
  showCloseButton: true,
};

export default class Notification extends Component {
  constructor() {
    super();

    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleCloseButtonFocus = this.handleCloseButtonFocus.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidMount() {
    const {
      autoClose,
    } = this.props;

    if (autoClose) {
      this.startAutoCloseTimer();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      autoClose: prevAutoClose,
    } = prevProps;

    const {
      autoClose,
    } = this.props;

    if (autoClose && !prevAutoClose) {
      this.startAutoCloseTimer();
    }
  }

  cancelAutoCloseTimer() {
    if (this.autoCloseTimer) {
      window.clearTimeout(this.autoCloseTimer);
    }

    this.autoCloseTimer = null;
  }

  close() {
    const {
      id,
      close,
    } = this.props;

    if (close) {
      close(id);
    }
  }

  startAutoCloseTimer() {
    const {
      autoCloseTime,
    } = this.props;

    this.cancelAutoCloseTimer();

    this.autoCloseTimer = window.setTimeout(() => {
      this.close();
    }, autoCloseTime);
  }

  handleCloseButtonClick() {
    this.close();
  }

  handleCloseButtonFocus() {
    this.cancelAutoCloseTimer();
  }

  handleMouseDown() {
    this.cancelAutoCloseTimer();
  }

  render() {
    const {
      message,
      values,
      date,
      status,
      showCloseButton,
      children,
    } = this.props;

    const className = status ? styles[status] : styles.common;

    let timestamp = null;

    if (date) {
      timestamp = (
        <FormattedTime
          value={date}
          hour="numeric"
          minute="numeric"
          second="numeric"
        />
      );
    }

    let closeButton;

    if (showCloseButton) {
      closeButton = (
        <MiniCloseButton
          onClick={this.handleCloseButtonClick}
          onFocus={this.handleCloseButtonFocus}
        />
      );
    }

    let content;

    if (children) {
      content = children;
    } else {
      content = (
        <ul>
          <li><FormattedMessage {...message} values={values} /></li>
        </ul>
      );
    }

    return (
      <div className={className} onMouseDown={this.handleMouseDown}>
        {closeButton}
        <div>
          <header>
            {timestamp}
          </header>
          <div>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
