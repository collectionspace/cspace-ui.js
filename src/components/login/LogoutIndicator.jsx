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
    const {
      isPending,
    } = this.props;

    if (!isPending) {
      return null;
    }

    return (
      <div>Signing out...</div>
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
        <div>Success!</div>
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
      <div>Error: {error.response.data.error_description}</div>
    );
  }

  render() {
    return (
      this.renderPending() ||
      this.renderSuccess() ||
      this.renderError()
    );
  }
}

LogoutIndicator.propTypes = {
  isPending: PropTypes.bool,
  response: PropTypes.object,
  error: PropTypes.object,
  onSuccess: PropTypes.func,
};
