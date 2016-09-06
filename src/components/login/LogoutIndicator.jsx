import React, { Component, PropTypes } from 'react';

// TODO: i18n

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
    return (
      <div>Signing out...</div>
    );
  }

  renderSuccess() {
    return (
      <div>
        <h2><br /></h2>
        <div>Success!</div>
      </div>
    );
  }

  renderError() {
    const {
      error,
    } = this.props;

    return (
      <div>Error: {error.response.data.error_description}!</div>
    );
  }

  render() {
    const {
      isPending,
      response,
      error,
    } = this.props;

    if (isPending) {
      return this.renderPending();
    }

    if (response) {
      return this.renderSuccess();
    }

    if (error) {
      return this.renderError();
    }

    return null;
  }
}

LogoutIndicator.propTypes = {
  isPending: PropTypes.bool,
  response: PropTypes.object,
  error: PropTypes.object,
  onSuccess: PropTypes.func,
};
