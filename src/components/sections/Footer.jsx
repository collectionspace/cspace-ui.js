/* global cspaceUI */
/* The cspaceUI global variable is set by webpack (in non-test builds). See webpack.config.js. */

import React from 'react';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/Footer.css';

const messages = defineMessages({
  copyright: {
    id: 'footer.copyright',
    defaultMessage: 'Copyright © {startYear}–{endYear} CollectionSpace',
  },
  about: {
    id: 'footer.about',
    defaultMessage: 'About CollectionSpace',
  },
  feedback: {
    id: 'footer.feedback',
    defaultMessage: 'Leave Feedback',
  },
  feedbackUrl: {
    id: 'footer.feedbackUrl',
    defaultMessage: 'http://www.collectionspace.org/contact',
  },
  release: {
    id: 'footer.release',
    defaultMessage: 'Release {version}',
  },
  uiInfo: {
    id: 'footer.uiInfo',
    defaultMessage: '{name} version {version}',
  },
});

const propTypes = {
  intl: intlShape.isRequired,
};

export default function Footer(props) {
  const {
    intl,
  } = props;

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

        <li>
          <a href="http://www.collectionspace.org">
            <FormattedMessage {...messages.about} />
          </a>
        </li>

        <li>
          <a href={intl.formatMessage(messages.feedbackUrl)}>
            <FormattedMessage {...messages.feedback} />
          </a>
        </li>
      </ul>

      <ul>
        <li>
          <a href="https://wiki.collectionspace.org/display/collectionspace/Release+5.0">
            <FormattedMessage {...messages.release} values={{ version: '5.0' }} />
          </a>
        </li>

        <li>
          <FormattedMessage
            {...messages.uiInfo}
            values={typeof cspaceUI !== 'undefined' && {
              name: cspaceUI.packageName,
              version: cspaceUI.packageVersion,
            }}
          />
        </li>
      </ul>
    </footer>
  );
}

Footer.propTypes = propTypes;
