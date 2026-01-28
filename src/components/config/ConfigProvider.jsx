import { Component, Children } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
};

const childContextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
};

export default class ConfigProvider extends Component {
  getChildContext() {
    const {
      config,
    } = this.props;

    return {
      config,
    };
  }

  render() {
    const {
      children,
    } = this.props;

    return Children.only(children);
  }
}

ConfigProvider.propTypes = propTypes;
ConfigProvider.childContextTypes = childContextTypes;
