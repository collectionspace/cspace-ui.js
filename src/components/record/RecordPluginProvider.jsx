import { Component, Children, PropTypes } from 'react';

export default class RecordPluginProvider extends Component {
  getChildContext() {
    return {
      recordPlugins: this.props.recordPlugins,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

RecordPluginProvider.propTypes = {
  children: PropTypes.node.isRequired,
  recordPlugins: PropTypes.object.isRequired,
};

RecordPluginProvider.childContextTypes = {
  recordPlugins: PropTypes.object,
};
