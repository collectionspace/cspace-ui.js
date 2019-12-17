import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Panel } from 'cspace-layout';
import withConfig from '../../enhancers/withConfig';
import withRecordType from '../../enhancers/withRecordType';
import { collapsePanel } from '../../actions/prefs';
import { isPanelCollapsed } from '../../reducers';

const getHeader = (key, messages) => {
  const message = messages.panel[key];

  if (!message) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <h3><FormattedMessage {...message} /></h3>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    config,
    msgkey,
    name,
    recordType,
  } = ownProps;

  let {
    header,
  } = ownProps;

  let collapsed = isPanelCollapsed(state, recordType, name);

  if (typeof collapsed === 'undefined') {
    collapsed = ownProps.collapsed;
  }

  if (!header) {
    const {
      messages,
    } = config.recordTypes[recordType];

    header = getHeader(msgkey || name, messages);
  }

  return {
    collapsed,
    header,
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

export const ConnectedPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel);

const EnhancedConnectedPanel = withRecordType(withConfig(ConnectedPanel));

EnhancedConnectedPanel.propTypes = Panel.propTypes;

export default EnhancedConnectedPanel;
