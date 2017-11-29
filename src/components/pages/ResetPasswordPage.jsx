import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import PasswordResetForm from '../user/PasswordResetForm';
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
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default function ResetPasswordPage(props) {
  const {
    location,
    match,
  } = props;

  let form;

  if (match.params.token) {
    form = (
      <PasswordResetForm />
    );
  } else {
    form = (
      <PasswordResetRequestFormContainer
        email={location.state.username}
      />
    );
  }

  return (
    <div className={styles.common}>
      <h1><FormattedMessage {...messages.title} /></h1>
      {form}
    </div>
  );
}

ResetPasswordPage.propTypes = propTypes;
