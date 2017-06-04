/* global window */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { baseComponents as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/Notification.css';

const { MiniButton } = inputComponents;

const propTypes = {
  id: PropTypes.number.isRequired,
  messageDescriptor: PropTypes.objectOf(PropTypes.string),
  values: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.instanceOf(Date),
  status: PropTypes.string,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  close: PropTypes.func,
};

const defaultProps = {
  autoCloseTime: 5000, //ms
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
      messageDescriptor,
      values,
      date,
      status,
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

    return (
      <div className={className} onMouseDown={this.handleMouseDown}>
        <div>
          <header>
            {timestamp}
          </header>
          <div>
            <FormattedMessage {...messageDescriptor} values={values} />
          </div>
        </div>
        <footer>
          <MiniButton
            className="material-icons"
            onClick={this.handleCloseButtonClick}
            onFocus={this.handleCloseButtonFocus}
          >
            close
          </MiniButton>
        </footer>
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
