import { connect } from 'react-redux';
import Panel from '../../components/layout/Panel';
import withRecordType from '../../enhancers/withRecordType';
import { collapsePanel } from '../../actions/prefs';
import { isPanelCollapsed } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    recordType,
  } = ownProps;

  let collapsed = isPanelCollapsed(state, recordType, name);

  if (typeof collapsed === 'undefined') {
    collapsed = ownProps.collapsed;
  }

  return {
    collapsed,
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

export const PanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Panel);

PanelContainer.propTypes = Panel.propTypes;

const RecordTypeAwarePanelContainer = withRecordType(PanelContainer);

RecordTypeAwarePanelContainer.propTypes = PanelContainer.propTypes;

export default RecordTypeAwarePanelContainer;
