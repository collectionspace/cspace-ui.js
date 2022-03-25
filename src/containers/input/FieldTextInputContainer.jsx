import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { components as inputComponents } from 'cspace-input';
import { injectIntl, intlShape } from 'react-intl';
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

export const formatHumanReadable = (type, value, context) => {
  let formatted;

  // the key is created with schema:fieldName:listIndex
  // we have 3 outcomes -- an array of index 1 (unqualified), 2 (qualified), or 3 (qualified list)
  // see: AuditDocumentHandler.java
  const parts = value.split(':');
  if (parts.length === 2) {
    formatted = formatRecordTypeSourceField(type, value, context);
  } else if (parts.length === 3) {
    // todo: get child of the key
    formatted = formatRecordTypeSourceField(type, `${parts[0]}:${parts[1]}`, context);
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
