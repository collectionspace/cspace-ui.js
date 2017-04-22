import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/Footer.css';

const messages = defineMessages({
  copyright: {
    id: 'footer.copyright',
    defaultMessage: 'Copyright © {startYear}-{endYear} CollectionSpace',
  },
  release: {
    id: 'footer.release',
    defaultMessage: 'Release {version}',
  },
  about: {
    id: 'footer.about',
    defaultMessage: 'About CollectionSpace',
  },
  feedback: {
    id: 'footer.feedback',
    defaultMessage: 'Leave Feedback',
  },
});

export default function Footer() {
  const thisYear = (new Date()).getFullYear().toString();

  return (
    <footer className={styles.common}>
      <ul>
        <li>
          <FormattedMessage
            {...messages.copyright}
            values={{
              startYear: '2009',
              endYear: thisYear,
            }}
          />
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://wiki.collectionspace.org/display/collectionspace/Release+5.0">
            <FormattedMessage {...messages.release} values={{ version: '5.0' }} />
          </a>
        </li>
        <li>
          <a href="http://www.collectionspace.org">
            <FormattedMessage {...messages.about} />
          </a>
        </li>
        <li>
          <a href="http://www.collectionspace.org/contact">
            <FormattedMessage {...messages.feedback} />
          </a>
        </li>
      </ul>
    </footer>
  );
}
