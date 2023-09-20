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
  intl: intlShape.isRequired,
};

const defaultProps = {
  csrf: null,
};

const messages = defineMessages({
  title: {
    id: 'serviceLoginPage.title',
    description: 'Title of the logout page.',
    defaultMessage: 'Sign out',
  },
  logout: {
    id: 'serviceLogoutPage.logout',
    description: 'Label for the logout button.',
    defaultMessage: 'Sign out',
  },
});

function ServiceLogoutPage(props) {
  const {
    csrf,
    intl,
  } = props;

  const csrfInput = csrf
    ? <input type="hidden" name={csrf.parameterName} value={csrf.token} />
    : undefined;

  return (
    <main>
      <Helmet>
        <title>{intl.formatMessage(messages.title)}</title>
      </Helmet>

      <form method="POST">
        {csrfInput}

        <button className="logout" type="submit"><FormattedMessage {...messages.logout} /></button>
      </form>
    </main>
  );
}

ServiceLogoutPage.propTypes = propTypes;
ServiceLogoutPage.defaultProps = defaultProps;

export default injectIntl(ServiceLogoutPage);
