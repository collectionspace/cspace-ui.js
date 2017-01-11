import { Component, Children, PropTypes } from 'react';

export default class ConfigProvider extends Component {
  getChildContext() {
    return {
      config: this.props.config,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object.isRequired,
};

ConfigProvider.childContextTypes = {
  config: PropTypes.object,
};
