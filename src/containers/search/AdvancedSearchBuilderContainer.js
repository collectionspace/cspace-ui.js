import { connect } from 'react-redux';
import AdvancedSearchBuilder from '../../components/search/AdvancedSearchBuilder';
import { getRecordGroupOptionListName } from '../../helpers/configHelpers';

import {
  getOptionList,
  getSearchCondition,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    recordType,
  } = ownProps;

  const groupOptions = getOptionList(state, getRecordGroupOptionListName(recordType));

  return {
    hasChildGroups: groupOptions && groupOptions.length > 0,
    preferredCondition: getSearchCondition(state, recordType),
  };
};

export default connect(
  mapStateToProps,
)(AdvancedSearchBuilder);
