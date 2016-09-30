import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRecordType from '../../enhancers/withRecordType';
import { collapsePanel } from '../../actions';
import { isPanelCollapsed } from '../../reducers';

import styles from '../../../styles/cspace-ui/Panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick() {
    const {
      collapsible,
      collapsed,
      name,
      onToggleCollapsed,
    } = this.props;

    if (collapsible && onToggleCollapsed) {
      onToggleCollapsed(name, !collapsed);
    }
  }

  renderHeader() {
    const {
      header,
    } = this.props;

    if (!header) {
      return null;
    }

    return (
      <header>
        <button type="button" onClick={this.handleHeaderClick}>
          {header}
        </button>
      </header>
    );
  }

  renderBody() {
    const {
      collapsible,
      collapsed,
      children,
    } = this.props;

    if (collapsible && collapsed) {
      return null;
    }

    return (
      <div>
        {children}
      </div>
    );
  }

  render() {
    const header = this.renderHeader();
    const body = this.renderBody();

    const {
      collapsible,
      collapsed,
    } = this.props;

    const className = (collapsible && collapsed) ? styles.collapsed : styles.normal;

    return (
      <section className={className}>
        {header}
        {body}
      </section>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.node,
  collapsible: React.PropTypes.bool,
  collapsed: React.PropTypes.bool,
  header: PropTypes.node,
  name: PropTypes.string,
  onToggleCollapsed: PropTypes.func,
};

Panel.defaultProps = {
  collapsible: false,
  collapsed: false,
};

// FIXME: Split the container out to a different file.

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    recordType,
  } = ownProps;

  return {
    collapsed: isPanelCollapsed(state, recordType, name),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    recordType,
  } = ownProps;

  return {
    onToggleCollapsed: (name, collapsed) => {
      dispatch(collapsePanel(recordType, name, collapsed));
    },
  };
};

const ConnectedPanel = withRecordType(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel));

ConnectedPanel.propTypes = Panel.propTypes;

export default ConnectedPanel;
