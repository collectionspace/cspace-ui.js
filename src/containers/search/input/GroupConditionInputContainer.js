import { connect } from 'react-redux';
import GroupConditionInput from '../../../components/search/input/GroupConditionInput';
import { getRecordGroupOptionListName } from '../../../helpers/configHelpers';

import {
  buildRecordFieldOptionLists,
  deleteOptionList,
} from '../../../actions/optionList';

import {
  getOptionList,
} from '../../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    condition,
    recordType,
  } = ownProps;

  const path = condition && condition.get('path');
  const groupOptions = getOptionList(state, getRecordGroupOptionListName(recordType, path));

  return {
    hasChildGroups: groupOptions && groupOptions.length > 0,
  };
};

const mapDispatchToProps = {
  buildRecordFieldOptionLists,
  deleteOptionList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupConditionInput);
