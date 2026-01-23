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
};

const defaultProps = {
  color: 'black',
  isOpen: true,
};

export default function SidebarToggleButton(props) {
  const {
    color,
    isOpen,
    toggle,
  } = props;

  const className = classNames(
    isOpen ? styles.normal : styles.closed,
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
