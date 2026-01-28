import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';

const propTypes = {
  csrf: PropTypes.object,
  error: PropTypes.string,
  isLogoutSuccess: PropTypes.bool,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  sso: PropTypes.object,
  tenantId: PropTypes.string,
};

const defaultProps = {
  csrf: null,
  error: null,
  isLogoutSuccess: false,
  locale: 'en-US',
  sso: {},
  tenantId: null,
};

const messages = defineMessages({
  title: {
    id: 'serviceLoginPage.title',
    description: 'Title of the login page.',
    defaultMessage: 'Sign in',
  },
  prompt: {
    id: 'serviceLoginPage.prompt',
    description: 'Prompt to log in.',
    defaultMessage: 'Please sign in to continue.',
  },
  username: {
    id: 'serviceLoginPage.username',
    description: 'Label for the login username field.',
    defaultMessage: 'Email',
  },
  password: {
    id: 'serviceLoginPage.password',
    description: 'Label for the login password field.',
    defaultMessage: 'Password',
  },
  forgotPassword: {
    id: 'serviceLoginPage.forgotPassword',
    description: 'Text of the forgot password link.',
    defaultMessage: 'Forgot password',
  },
  ssoLink: {
    id: 'serviceLoginPage.ssoLink',
    defaultMessage: 'Continue with {name}',
  },
  localLogin: {
    id: 'serviceLoginPage.localLogin',
    defaultMessage: 'Continue with email and password',
  },
  logoutSuccess: {
    id: 'serviceLoginPage.logoutSuccess',
    defaultMessage: 'Sign out complete.',
  },
  errorBadCredentials: {
    id: 'serviceLoginPage.errorBadCredentials',
    defaultMessage: 'Sign in failed. Incorrect username/password.',
  },
});

function ServiceLoginPage(props) {
  const {
    csrf,
    error,
    isLogoutSuccess,
    intl,
    locale,
    sso,
    tenantId,
  } = props;

  const ssoLinks = Object.entries(sso)
    .sort((a, b) => a[1].name.localeCompare(b[1].name, locale, { sensitivity: 'base' }))
    .map(([url, config]) => {
      const { icon } = config;

      const style = icon
        ? { backgroundImage: `url(${icon})` }
        : undefined;

      return (
        <a className="login" href={url} style={style}>
          <FormattedMessage {...messages.ssoLink} values={config} />
        </a>
      );
    });

  const ssoPanel = (ssoLinks.length > 0)
    ? <div className="sso">{ssoLinks}</div>
    : undefined;

  const csrfInput = csrf
    ? <input type="hidden" name={csrf.parameterName} value={csrf.token} />
    : undefined;

  const successMessage = isLogoutSuccess
    ? <p className="status success"><FormattedMessage {...messages.logoutSuccess} /></p>
    : undefined;

  let formattedError;

  if (/bad credentials/i.test(error)) {
    formattedError = <FormattedMessage {...messages.errorBadCredentials} />;
  } else {
    formattedError = error;
  }

  const errorMessage = formattedError
    ? <p className="status error">{formattedError}</p>
    : undefined;

  const tidParam = tenantId ? `?tid=${tenantId}` : '';

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.title)}</title>
      </Helmet>

      {successMessage}
      {errorMessage}

      <main>
        <p><FormattedMessage {...messages.prompt} /></p>

        {ssoPanel}

        <form method="POST">
          <div>
            {/* Ignore an eslint misfire. */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <FormattedMessage {...messages.username} />

              <input
                autoComplete="username email"
                name="username"
                type="text"
              />
            </label>
          </div>

          <div>
            {/* Ignore an eslint misfire. */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <FormattedMessage {...messages.password} />

              <input
                autoComplete="current-password"
                name="password"
                type="password"
              />
            </label>
          </div>

          <div>
            {csrfInput}

            <button className="login" type="submit">
              <FormattedMessage {...messages.localLogin} />
            </button>
          </div>

          <div>
            <a href={`./accounts/requestpasswordreset${tidParam}`}>
              <FormattedMessage {...messages.forgotPassword} />
            </a>
          </div>
        </form>
      </main>
    </>
  );
}

ServiceLoginPage.propTypes = propTypes;
ServiceLoginPage.defaultProps = defaultProps;

export default injectIntl(ServiceLoginPage);
