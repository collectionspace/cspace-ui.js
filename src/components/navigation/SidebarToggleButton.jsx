import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/SidebarToggleButton.css';

const messages = defineMessages({
  hide: {
    id: 'sidebarToggleButton.hide',
    description: 'Label of the button to hide the sidebar.',
    defaultMessage: 'Hide sidebar',
  },
  show: {
    id: 'sidebarToggleButton.show',
    description: 'Label of the button to show the sidebar.',
    defaultMessage: 'Show sidebar',
  },
});

const propTypes = {
  color: PropTypes.string,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  position: PropTypes.string,
};

const defaultProps = {
  color: 'black',
  isOpen: true,
  position: 'right',
};

export default function SidebarToggleButton(props) {
  const {
    color,
    isOpen,
    toggle,
    position,
  } = props;

  let style;
  if (position === 'right') {
    style = isOpen ? styles.normal : styles.closed;
  } else {
    style = isOpen ? styles.left : styles.closedLeft;
  }

  const className = classNames(
    style,
    styles[color],
  );

  const labelMessage = isOpen ? messages.hide : messages.show;

  return (
    <button
      className={className}
      name="toggleSidebar"
      type="button"
      onClick={toggle}
    >
      <FormattedMessage {...labelMessage} />
    </button>
  );
}

SidebarToggleButton.propTypes = propTypes;
SidebarToggleButton.defaultProps = defaultProps;
