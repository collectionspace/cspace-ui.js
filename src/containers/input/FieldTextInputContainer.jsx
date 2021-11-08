import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { components as inputComponents } from 'cspace-input';
import { injectIntl, intlShape } from 'react-intl';
import get from 'lodash/get';
import { formatRecordTypeSourceField } from '../../helpers/formatHelpers';
import withConfig from '../../enhancers/withConfig';
import withCsid from '../../enhancers/withCsid';
import { getRecordData } from '../../reducers';

const { TextInput } = inputComponents;

const propTypes = {
  csid: PropTypes.string,
  intl: intlShape,
  config: PropTypes.object,
  value: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    csid,
    config,
    value,
  } = ownProps;

  console.log(`Formatting value for csid: ${csid} intl:${intl} config:${config} ${value}`);
  let formattedValue = value;
  const recordData = getRecordData(state, csid);
  if (recordData && value) {
    const auditedType = recordData.getIn(['ns3:audit_common', 'resourceType']).toLowerCase();
    console.log(`formatted value = ${formatRecordTypeSourceField(auditedType, value, { intl, config })}`);
    const recordTypeConfig = config.recordTypes[auditedType];
    console.log(`descriptor = ${get(recordTypeConfig, ['fields', 'ns3:audit_common'])}`);
    // const partDescriptor = get(recordTypeConfig, ['fields', 'document', `${NS_PREFIX}:${partName}`]);
    formattedValue = formatRecordTypeSourceField(auditedType, value, { intl, config });
  }

  return {
    value: formattedValue,
  };
};

export const ConnectedFieldTextContainer = connect(mapStateToProps)(TextInput);

const EnhancedFieldTextContainer = injectIntl(withConfig(withCsid(ConnectedFieldTextContainer)));

EnhancedFieldTextContainer.propTypes = propTypes;

export default EnhancedFieldTextContainer;
