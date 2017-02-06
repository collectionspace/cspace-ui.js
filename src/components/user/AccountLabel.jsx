import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

const propTypes = {
  account: PropTypes.instanceOf(Immutable.Map),
  userId: PropTypes.string,
  findAccount: PropTypes.func,
};

export default class AccountLabel extends Component {
  componentDidMount() {
    const {
      findAccount,
      userId,
    } = this.props;

    if (findAccount) {
      findAccount(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      userId,
      findAccount,
    } = this.props;

    if (findAccount && (prevProps.userId !== userId)) {
      findAccount(userId);
    }
  }

  render() {
    const {
      account,
      userId,
    } = this.props;

    let label;

    if (account) {
      label = account.get('screenName');
    } else if (userId) {
      label = userId;
    }

    if (label) {
      return (
        <span>{label}</span>
      );
    }

    return null;
  }
}

AccountLabel.propTypes = propTypes;
