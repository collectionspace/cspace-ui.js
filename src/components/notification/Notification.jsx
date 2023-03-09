/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedTime } from 'react-intl';
import MiniCloseButton from '../navigation/MiniCloseButton';
import styles from '../../../styles/cspace-ui/Notification.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
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

  handleCloseButtonClick() {
    this.close();
  }

  handleCloseButtonFocus() {
    this.cancelAutoCloseTimer();
  }

  handleMouseDown() {
    this.cancelAutoCloseTimer();
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

  render() {
    const {
      items,
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
    } else if (items) {
      const listItems = items.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}><FormattedMessage {...item.message} values={item.values} /></li>
      ));

      content = (
        <ul>
          {listItems}
        </ul>
      );
    }

    return (
      // FIXME: Move mouse down handler into a button.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div className={className} role="status" onMouseDown={this.handleMouseDown}>
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
