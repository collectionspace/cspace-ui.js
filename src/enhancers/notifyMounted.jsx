import React, { Component } from 'react';

export default function notifyMounted(BaseComponent, callback, ...args) {
  class NotifyMounted extends Component {
    componentDidMount() {
      callback(...args);
    }

    render() {
      return (
        <BaseComponent {...this.props} />
      );
    }
  }

  return NotifyMounted;
}
