import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';

const propTypes = {
  isPending: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  response: PropTypes.object,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  onSuccess: PropTypes.func,
};

const messages = defineMessages({
  pending: {
    id: 'logoutIndicator.pending',
    description: 'Message displayed while logout is in progress.',
    defaultMessage: 'Signing out...',
  },
  success: {
    id: 'logoutIndicator.success',
    description: 'Message displayed when logout completes successfully.',
    defaultMessage: 'Success!',
  },
});

export default class LogoutIndicator extends Component {
  componentDidUpdate(prevProps) {
    const {
      onSuccess,
      isPending,
      response,
    } = this.props;

    if (onSuccess) {
      const isSuccess = (prevProps.isPending && !isPending && response);

      if (isSuccess) {
        onSuccess();
      }
    }
  }

  renderPending() {
    const {
      isPending,
    } = this.props;

    if (!isPending) {
      return null;
    }

    return (
      <div><FormattedMessage {...messages.pending} /></div>
    );
  }

  renderSuccess() {
    const {
      response,
    } = this.props;

    if (!response) {
      return null;
    }

    return (
      <div>
        <h2><br /></h2>
        <p><FormattedMessage {...messages.success} /></p>
      </div>
    );
  }

  renderError() {
    const {
      error,
    } = this.props;

    if (!error) {
      return null;
    }

    return (
      <div>{error.message}</div>
    );
  }

  render() {
    return (
      this.renderPending()
      || this.renderSuccess()
      || this.renderError()
    );
  }
}

LogoutIndicator.propTypes = propTypes;
