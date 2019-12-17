import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import qs from 'qs';
import PasswordResetFormContainer from '../../containers/user/PasswordResetFormContainer';
import PasswordResetRequestFormContainer from '../../containers/user/PasswordResetRequestFormContainer';
import styles from '../../../styles/cspace-ui/ResetPasswordPage.css';

const messages = defineMessages({
  title: {
    id: 'resetPasswordPage.title',
    description: 'Title of the reset password page.',
    defaultMessage: 'Reset Password',
  },
});

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
};

export default function ResetPasswordPage(props) {
  const {
    location,
  } = props;

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  const {
    token,
  } = query;

  const form = token
    ? <PasswordResetFormContainer token={token} />
    : <PasswordResetRequestFormContainer email={get(location, ['state', 'username'])} />;

  return (
    <div className={styles.common}>
      <h1><FormattedMessage {...messages.title} /></h1>
      {form}
    </div>
  );
}

ResetPasswordPage.propTypes = propTypes;
