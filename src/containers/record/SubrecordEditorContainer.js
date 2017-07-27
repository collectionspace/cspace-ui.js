import { connect } from 'react-redux';

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

export default connect(
  mapStateToProps,
)(SubrecordEditor);
