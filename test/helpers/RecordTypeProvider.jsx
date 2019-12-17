import { Component, Children } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  recordType: PropTypes.string,
};

const childContextTypes = {
  recordType: PropTypes.string,
};

export default class RecordTypeProvider extends Component {
  getChildContext() {
    const {
      recordType,
    } = this.props;

    return {
      recordType,
    };
  }

  render() {
    const {
      children,
    } = this.props;

    return Children.only(children);
  }
}

RecordTypeProvider.propTypes = propTypes;
RecordTypeProvider.childContextTypes = childContextTypes;
