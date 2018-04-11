import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import get from 'lodash/get';
import warning from 'warning';

import {
  components as inputComponents,
  helpers as inputHelpers,
} from 'cspace-input';

import {
  configKey,
  dataPathToFieldDescriptorPath,
  isFieldRequired,
} from '../../helpers/configHelpers';

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

const { Label } = inputComponents;

const defaultViewConfigKey = 'view';

const renderLabel = (fieldDescriptor, providedLabelMessage, recordData, props) => {
  const fieldConfig = fieldDescriptor[configKey];
  const message = providedLabelMessage || get(fieldConfig, ['messages', 'name']);

  if (!message) {
    return null;
  }

  const configuredProps = {};

  if ('required' in fieldConfig) {
    configuredProps.required = isFieldRequired(fieldDescriptor, recordData);
  }

  if ('readOnly' in fieldConfig) {
    configuredProps.readOnly = fieldConfig.readOnly;
  }

  return (
    <Label {...props} {...configuredProps}>
      <FormattedMessage {...message} />
    </Label>
  );
};

const propTypes = {
  labelMessage: PropTypes.object,
  viewType: PropTypes.string,

  // Code in this component doesn't use these props, but the propTypes need to exist, because
  // users of this component may check for them to determine if those props should be passed.
  // We want to receive all the props that our base components may need, and then we'll handle
  // distributing them to the base components that accept them.

  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  // The value prop will be validated by the base component, so allow anything here.
  value: PropTypes.any,
  parentPath: PropTypes.array,
  subpath: pathPropType,
  tabular: PropTypes.bool,
  label: PropTypes.node,
  readOnly: PropTypes.bool,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
  onSortInstances: PropTypes.func,
  /* eslint-enable react/no-unused-prop-types */
};

const contextTypes = {
  config: PropTypes.object,
  intl: intlShape,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
};

export default function Field(props, context) {
  const {
    config,
    intl,
    recordData,
    recordType,
  } = context;

  const {
    labelMessage,
    viewType,
  } = props;

  const fullPath = getPath(props);

  // Filter out numeric parts of the path, since they indicate repeating instances that won't be
  // present in the field descriptor.

  const path = dataPathToFieldDescriptorPath(fullPath);
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

  const fieldConfig = field[configKey];
  const viewConfigKey = (viewType === 'search') ? 'searchView' : defaultViewConfigKey;
  const viewConfig = fieldConfig[viewConfigKey] || fieldConfig[defaultViewConfigKey];
  const BaseComponent = viewConfig.type;
  const configuredProps = viewConfig.props || {};
  const providedProps = {};

  const basePropTypes = BaseComponent.propTypes;

  Object.keys(props).forEach((propName) => {
    if (propName in basePropTypes) {
      providedProps[propName] = props[propName];
    }
  });

  const effectiveReadOnly = providedProps.readOnly || configuredProps.readOnly;
  const computedProps = {};

  if (fieldConfig.repeating && viewType !== 'search') {
    computedProps.repeating = fieldConfig.repeating;
  }

  if ('label' in basePropTypes) {
    computedProps.label = renderLabel(field, labelMessage, recordData, {
      readOnly: effectiveReadOnly,
    });
  }

  if ('formatValue' in basePropTypes) {
    const valueMessage = get(fieldConfig, ['messages', 'value']);

    if (valueMessage) {
      computedProps.formatValue = value => intl.formatMessage(valueMessage, { value });
    }
  }

  if ('renderChildInputLabel' in basePropTypes) {
    computedProps.renderChildInputLabel = (childInput) => {
      const childName = childInput.props.name;
      const childLabelMessage = childInput.props.labelMessage;
      const childField = field[childName];

      return renderLabel(childField, childLabelMessage, recordData, {
        key: childName,
        readOnly: effectiveReadOnly,
      });
    };
  }

  if ('viewType' in basePropTypes) {
    computedProps.viewType = viewType;
  }

  const effectiveProps = Object.assign({}, computedProps, configuredProps, providedProps, {
    readOnly: effectiveReadOnly,
  });

  return (
    <BaseComponent {...effectiveProps} />
  );
}

Field.contextTypes = contextTypes;
Field.propTypes = propTypes;
