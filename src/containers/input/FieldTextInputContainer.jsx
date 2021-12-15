import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { components as inputComponents } from 'cspace-input';
import { injectIntl, intlShape } from 'react-intl';
import get from 'lodash/get';
import { NS_PREFIX } from '../../constants/xmlNames';
import { configKey } from '../../helpers/configHelpers';
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

export const getFirstChild = (recordType, partName, fieldName, { config }) => {
  const recordTypeConfig = config.recordTypes[recordType];
  const partDescriptor = get(recordTypeConfig, ['fields', 'document', `${NS_PREFIX}:${partName}`]);
  if (!partDescriptor) {
    return fieldName;
  }

  let updatedField = fieldName;
  const fieldDescriptor = partDescriptor[fieldName];
  if (fieldDescriptor) {
    updatedField = Object.keys(fieldDescriptor).filter((key) => key !== configKey);
  }

  return updatedField;
};

export const formatHumanReadable = (type, value, context) => {
  let formatted;

  // the key is created with schema:fieldName:listIndex
  // we have 3 outcomes -- an array of index 1 (unqualified), 2 (qualified), or 3 (qualified list)
  // for qualified lists, use the child key if available
  // see: AuditDocumentHandler.java
  const parts = value.split(':');
  const [partName, fieldName] = parts;
  if (parts.length === 2) {
    formatted = formatRecordTypeSourceField(type, value, context);
  } else if (parts.length === 3) {
    // todo: display index?
    const childName = getFirstChild(type, partName, fieldName, context);
    formatted = formatRecordTypeSourceField(type, `${partName}:${childName}`, context);
  } else {
    formatted = value;
  }

  // when the fieldConfig isn't found, the return is of the form [${fieldName}], which is
  // less readable than the value itself
  return formatted[0] === '[' ? value : formatted;
};

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    csid,
    config,
    value,
  } = ownProps;

  let formattedValue;
  const recordData = getRecordData(state, csid);

  if (recordData && value) {
    const auditedType = recordData.getIn(['ns3:audit_common', 'resourceType']).toLowerCase();
    formattedValue = formatHumanReadable(auditedType, value, { intl, config });
  }

  return {
    value: formattedValue || value,
  };
};

/**
 * trim out props not needed for TextInput
 */
const mergeProps = (stateProps, _dispatchProps, ownProps) => {
  const {
    intl,
    csid,
    config,
    value,
    ...remainingProps
  } = ownProps;

  return {
    ...stateProps,
    ...remainingProps,
  };
};

export const ConnectedFieldTextContainer = connect(mapStateToProps, null, mergeProps)(TextInput);

const EnhancedFieldTextContainer = injectIntl(withConfig(withCsid(ConnectedFieldTextContainer)));

EnhancedFieldTextContainer.propTypes = propTypes;

export default EnhancedFieldTextContainer;
