import { Component, Children, PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  router: routerShape.isRequired,
};

const childContextTypes = {
  router: routerShape,
};

export default class RouterProvider extends Component {
  getChildContext() {
    return {
      router: this.props.router,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

RouterProvider.propTypes = propTypes;
RouterProvider.childContextTypes = childContextTypes;
