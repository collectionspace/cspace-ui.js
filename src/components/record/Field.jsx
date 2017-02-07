import React, { PropTypes } from 'react';
import get from 'lodash/get';
import warning from 'warning';

import {
    helpers as inputHelpers,
} from 'cspace-input';

import {
  fieldDescriptorKeys,
} from '../../helpers/configHelpers';

const { pathHelpers } = inputHelpers;
const { config: configKey } = fieldDescriptorKeys;

const onlyDigitsPattern = /^\d+$/;

const isNotNumeric = string => !onlyDigitsPattern.test(string);

const propTypes = {
  // Code in this component doesn't use these props, but the propTypes need to exist, because
  // users of this component may check for them to determine if those props should be passed.
  // We want to receive all the props that our base components may need, and then we'll handle
  // distributing them to the base components that accept them.

  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  // The value prop will be validated by the base component, so allow anything here.
  value: PropTypes.any,
  parentPath: PropTypes.array,
  subpath: PropTypes.string,
  label: PropTypes.node,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */
};

const contextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
};

export default function Field(props, context) {
  const {
    config,
    recordType,
  } = context;

  // Filter out numeric parts of the path, since they indicate repeating instances that won't be
  // present in the field descriptor.

  const path = pathHelpers.getPath(props).filter(isNotNumeric);
  const fields = get(config, ['recordTypes', recordType, 'fields']);

  warning(fields, `No field descriptor found for the record type ${recordType}. The field with path ${path} will not be rendered.`);

  if (!fields) {
    return null;
  }

  const field = get(fields, path);

  warning(field, `The path ${path} is not present in the field descriptors for the record type ${recordType}. The field will not be rendered.`);

  if (!field) {
    return null;
  }

  const viewConfig = field[configKey].view;
  const BaseComponent = viewConfig.type;
  const configuredProps = viewConfig.props;
  const providedProps = {};

  const basePropTypes = BaseComponent.propTypes;

  Object.keys(props).forEach((propName) => {
    if (propName in basePropTypes) {
      providedProps[propName] = props[propName];
    }
  });

  return (
    <BaseComponent
      {...configuredProps}
      {...providedProps}
    />
  );
}

Field.contextTypes = contextTypes;
Field.propTypes = propTypes;
