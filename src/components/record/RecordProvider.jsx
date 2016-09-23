import { Component, Children, PropTypes } from 'react';

export default class RecordProvider extends Component {
  getChildContext() {
    return {
      records: this.props.records,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

RecordProvider.propTypes = {
  children: PropTypes.node.isRequired,
  records: PropTypes.object.isRequired,
};

RecordProvider.childContextTypes = {
  records: PropTypes.object,
};
