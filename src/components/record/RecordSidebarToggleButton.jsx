import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/RecordSidebarToggleButton.css';

const messages = defineMessages({
  hide: {
    id: 'recordSidebarToggleButton.hide',
    description: 'Label of the button to hide the sidebar.',
    defaultMessage: 'Hide sidebar',
  },
  show: {
    id: 'recordSidebarToggleButton.show',
    description: 'Label of the button to show the sidebar.',
    defaultMessage: 'Show sidebar',
  },
});

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
  isRecordSidebarOpen: PropTypes.bool,
  toggleRecordSidebar: PropTypes.func,
};

const defaultProps = {
  isRecordSidebarOpen: true,
};

export default function RecordSidebarToggleButton(props) {
  const {
    config,
    recordType,
    isRecordSidebarOpen,
    toggleRecordSidebar,
  } = props;

  const serviceType = get(config, ['recordTypes', recordType, 'serviceConfig', 'serviceType']);
  const isAuthority = serviceType === 'authority';

  const className = classNames(
    isRecordSidebarOpen ? styles.normal : styles.closed,
    isAuthority ? styles.purple : styles.blue,
  );

  const labelMessage = isRecordSidebarOpen ? messages.hide : messages.show;

  return (
    <button
      className={className}
      name="toggleSidebar"
      type="button"
      onClick={toggleRecordSidebar}
    >
      <FormattedMessage {...labelMessage} />
    </button>
  );
}

RecordSidebarToggleButton.propTypes = propTypes;
RecordSidebarToggleButton.defaultProps = defaultProps;
