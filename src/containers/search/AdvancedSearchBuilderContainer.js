import { connect } from 'react-redux';
import AdvancedSearchBuilder from '../../components/search/AdvancedSearchBuilder';
import { getRecordGroupOptionListName } from '../../helpers/configHelpers';

import {
  getOptionList,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    recordType,
  } = ownProps;

  const groupOptions = getOptionList(state, getRecordGroupOptionListName(recordType));

  return {
    hasChildGroups: groupOptions && groupOptions.length > 0,
  };
};

export default connect(
  mapStateToProps,
)(AdvancedSearchBuilder);
