/* global document */

import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import warning from 'warning';
import favicon from '../images/favicon.png';
import logoUrl from '../images/collectionspace.svg';
import rootStyles from '../styles/cspace-ui/RootPage.css';
import servicePageStyles from '../styles/cspace-ui/ServicePage.css';
import ServiceLoginPage from './components/pages/service/ServiceLoginPage';
import ServiceLogoutPage from './components/pages/service/ServiceLogoutPage';
import PasswordResetPage from './components/pages/service/PasswordResetPage';
import PasswordResetRequestPage from './components/pages/service/PasswordResetRequestPage';

const defaultConfig = {
  basename: '',
  className: '',
  container: '#cspace',
  locale: 'en-US',
  logo: logoUrl,
  messages: undefined,
  prettyUrls: false,
  serverUrl: '',
};

const title = 'CollectionSpace';

export default (uiConfig) => {
  const config = { ...defaultConfig, ...uiConfig };

  const {
    container,
    csrf,
    error,
    isLogoutSuccess,
    locale,
    logo,
    messages,
    tenantId,
    token,
  } = config;

  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace UI will not be rendered.`);

  if (mountNode) {
    warning(mountNode !== document.body,
      `The container element for the CollectionSpace UI found using the selector '${container}' is the document body. This may cause problems, and is not supported.`);
  }

  render(
    <IntlProvider locale={locale} defaultLocale="en-US" messages={messages}>
      <div className={rootStyles.common}>
        <Helmet
          defaultTitle={title}
          titleTemplate={`%s | ${title}`}
        >
          {/*
            * TODO: Generate a full set of icons to support a range of platforms (e.g. using
            * http://realfavicongenerator.net/)
            */}

          <link rel="shortcut icon" href={favicon} />
        </Helmet>

        <div className={servicePageStyles.common}>
          <header>
            <img src={logo} alt={title} />
          </header>

          <BrowserRouter basename="/cspace-services">
            <Switch>
              <Route
                path="/login"
                render={() => (
                  <ServiceLoginPage
                    csrf={csrf}
                    error={error}
                    isLogoutSuccess={isLogoutSuccess}
                    locale={locale}
                    tenantId={tenantId}
                  />
                )}
              />

              <Route
                path="/logout"
                render={() => (
                  <ServiceLogoutPage
                    csrf={csrf}
                  />
                )}
              />

              <Route
                path="/accounts/requestpasswordreset"
                render={() => (
                  <PasswordResetRequestPage
                    csrf={csrf}
                    tenantId={tenantId}
                  />
                )}
              />

              <Route
                path="/accounts/processpasswordreset"
                render={() => (
                  <PasswordResetPage
                    csrf={csrf}
                    tenantId={tenantId}
                    token={token}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </IntlProvider>,
    mountNode,
  );
};
