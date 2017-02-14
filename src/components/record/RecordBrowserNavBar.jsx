import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/RecordBrowserNavBar.css';

const messages = defineMessages({
  new: {
    id: 'recordBrowserNavBar.new',
    defaultMessage: 'New Record',
  },
  primary: {
    id: 'recordBrowserNavBar.primary',
    defaultMessage: 'Primary Record',
  },
});

const propTypes = {
  csid: PropTypes.string,
};

export default function RecordBrowserNavBar(props) {
  const {
    csid,
  } = props;

  const primaryTabMessage = csid ? messages.primary : messages.new;

  return (
    <nav className={styles.common}>
      <ul>
        <li><FormattedMessage {...primaryTabMessage} /></li>
      </ul>
    </nav>
  );
}

RecordBrowserNavBar.propTypes = propTypes;
