/* global cspaceUI */
/* The cspaceUI global variable is set by webpack (in non-test builds). See webpack.config.js. */

import React from 'react';
import PropTypes from 'prop-types';
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
  appName: {
    id: 'footer.appName',
    description: 'The name of the application, displayed in the footer.',
    defaultMessage: 'UI',
  },
  version: {
    id: 'footer.version',
    defaultMessage: '{name} version {version}',
  },
});

const propTypes = {
  config: PropTypes.object,
  intl: intlShape.isRequired,
};

const renderPluginInfo = (config, intl) => {
  const {
    pluginInfo,
  } = config;

  if (!pluginInfo) {
    return null;
  }

  return Object.keys(pluginInfo).map((name) => {
    const {
      messages: pluginMessages,
      version,
    } = pluginInfo[name];

    return (
      <li key={name}>
        <FormattedMessage
          {...messages.version}
          values={{
            version,
            name: intl.formatMessage(pluginMessages.name),
          }}
        />
      </li>
    );
  });
};

export default function Footer(props) {
  const {
    config,
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
            {...messages.version}
            values={{
              name: intl.formatMessage(messages.appName),
              version: (typeof cspaceUI === 'undefined') ? '' : cspaceUI.packageVersion,
            }}
          />
        </li>

        {renderPluginInfo(config, intl)}
      </ul>
    </footer>
  );
}

Footer.propTypes = propTypes;
