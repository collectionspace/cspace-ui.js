import { Component, Children, PropTypes } from 'react';

export default class RecordTypePluginProvider extends Component {
  getChildContext() {
    return {
      recordTypePlugins: this.props.recordTypePlugins,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

RecordTypePluginProvider.propTypes = {
  children: PropTypes.node.isRequired,
  recordTypePlugins: PropTypes.object.isRequired,
};

RecordTypePluginProvider.childContextTypes = {
  recordTypePlugins: PropTypes.object,
};
