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
    defaultMessage: '{name} version {version}',
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

const isSnapshot = (systemInfo) => {
  const patch = systemInfo && systemInfo.getIn(['ns2:system_info_common', 'version', 'patch']);

  return patch && patch.includes('-SNAPSHOT');
};

const renderServicesReleaseVersion = (systemInfo) => {
  const version = systemInfo && systemInfo.getIn(['ns2:system_info_common', 'version']);

  if (!version) {
    return '';
  }

  const major = version.get('major');
  const minor = version.get('minor');
  const patch = version.get('patch');

  let buildLink = null;

  if (!cspaceUI.isProduction || isSnapshot(systemInfo)) {
    const commitHash = version.get('build');

    buildLink = (
      <>
        {' '}
        (
        <a href={`https://github.com/collectionspace/services/commits/${commitHash}`}>
          {commitHash}
        </a>
        )
      </>
    );
  }

  return (
    <>
      {major}
      .
      {minor}
      .
      {patch}
      {buildLink}
    </>
  );
};

const renderUIVersion = (systemInfo) => {
  let buildLink = null;

  if (!cspaceUI.isProduction || isSnapshot(systemInfo)) {
    const commitHash = cspaceUI.buildNum;
    const repoUrl = cspaceUI.repositoryUrl.replace(/\.git$/, '');

    buildLink = (
      <>
        {' '}
        (
        <a href={`${repoUrl}/commits/${commitHash}`}>
          {commitHash}
        </a>
        )
      </>
    );
  }

  return (
    <>
      {cspaceUI.packageVersion}
      {buildLink}
    </>
  );
};

const renderPluginVersion = (systemInfo, pluginInfo) => {
  const {
    packageVersion,
    buildNum,
    repositoryUrl,
    version,
  } = pluginInfo;

  let buildLink = null;

  if (buildNum && (!cspaceUI.isProduction || isSnapshot(systemInfo))) {
    const commitHash = buildNum;
    const repoUrl = repositoryUrl ? repositoryUrl.replace(/\.git$/, '') : '';

    const commitLink = repoUrl
      ? <a href={`${repoUrl}/commits/${commitHash}`}>{commitHash}</a>
      : commitHash;

    buildLink = (
      <>
        {' '}
        (
        {commitLink}
        )
      </>
    );
  }

  return (
    <>
      {packageVersion || version}
      {buildLink}
    </>
  );
};

const renderPluginInfo = (systemInfo, config, intl) => {
  const {
    pluginInfo,
  } = config;

  if (!pluginInfo) {
    return null;
  }

  return Object.keys(pluginInfo).map((name) => {
    const info = pluginInfo[name];

    const {
      messages: pluginMessages,
    } = info;

    return (
      <li key={name}>
        <FormattedMessage
          {...messages.version}
          values={{
            version: renderPluginVersion(systemInfo, info),
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
      const releaseVersion = renderServicesReleaseVersion(systemInfo);

      if (releaseVersion) {
        statusItem = (
          <FormattedMessage {...messages.release} values={{ version: releaseVersion }} />
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
              version: renderUIVersion(systemInfo),
            }}
          />
        </li>

        {renderPluginInfo(systemInfo, config, intl)}
      </ul>
    </footer>
  );
}

Footer.propTypes = propTypes;
