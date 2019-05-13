/* global cspaceUI */
/* The cspaceUI global variable is set by webpack (in non-test builds). See webpack.config.js. */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
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
    defaultMessage: 'UC Berkeley {name} version {version}',
  },
  notConnected: {
    id: 'footer.notConnected',
    description: 'Message shown in the footer when a connection to the CollectionSpace server can not be established.',
    defaultMessage: 'Not connected to {serverUrl}',
  },
});

const propTypes = {
  config: PropTypes.shape({
    pluginInfo: PropTypes.object,
    serverUrl: PropTypes.string,
  }),
  intl: intlShape.isRequired,
  systemInfo: PropTypes.instanceOf(Immutable.Map),
};

const formatReleaseVersion = (systemInfo) => {
  const version = systemInfo && systemInfo.getIn(['ns2:system_info_common', 'version']);

  if (!version) {
    return '';
  }

  const major = version.get('major');
  const minor = version.get('minor');

  return `${major}.${minor}`;
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
    systemInfo,
  } = props;

  const thisYear = (new Date()).getFullYear().toString();

  let statusItem;

  if (systemInfo) {
    if (systemInfo.get('error')) {
      statusItem = (
        <FormattedMessage {...messages.notConnected} values={{ serverUrl: config.serverUrl }} />
      );
    } else {
      const releaseVersion = formatReleaseVersion(systemInfo);

      if (releaseVersion) {
        statusItem = (
          // TODO: Make release pages in the new wiki.
          // <a href={`https://wiki.collectionspace.org/display/collectionspace/Release+${releaseVersion}`}>
          <FormattedMessage {...messages.release} values={{ version: releaseVersion }} />
          // </a>
        );
      }
    }
  }

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
          {statusItem}
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
