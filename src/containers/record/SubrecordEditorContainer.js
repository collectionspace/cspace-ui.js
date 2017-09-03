import { connect } from 'react-redux';

import {
  detachSubrecord,
} from '../../actions/record';

import {
  getRecordData,
  getRecordSubrecordCsid,
} from '../../reducers';

import SubrecordEditor from '../../components/record/SubrecordEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    containerCsid,
    name,
  } = ownProps;

  const subrecordCsid = getRecordSubrecordCsid(state, containerCsid, name);

  return {
    csid: subrecordCsid,
    data: getRecordData(state, subrecordCsid),
  };
};

const mapDispatchToProps = {
  detachSubrecord,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubrecordEditor);
