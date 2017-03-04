import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import warning from 'warning';

import {
    components as inputComponents,
    helpers as inputHelpers,
} from 'cspace-input';

import {
  configKey,
  dataPathToFieldDescriptorPath,
} from '../../helpers/configHelpers';

const { pathHelpers } = inputHelpers;
const { Label } = inputComponents;

const defaultViewConfigKey = 'view';

const renderLabel = (fieldConfig, props) => {
  const message = get(fieldConfig, ['messages', 'name']);

  if (message) {
    return (
      <Label {...props}>
        <FormattedMessage {...message} />
      </Label>
    );
  }

  return null;
};

const propTypes = {
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

  const {
    viewType,
  } = props;

  // Filter out numeric parts of the path, since they indicate repeating instances that won't be
  // present in the field descriptor.

  const path = dataPathToFieldDescriptorPath(pathHelpers.getPath(props));
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
  const configuredProps = viewConfig.props;
  const providedProps = {};

  const basePropTypes = BaseComponent.propTypes;

  Object.keys(props).forEach((propName) => {
    if (propName in basePropTypes) {
      providedProps[propName] = props[propName];
    }
  });

  const computedProps = {};

  if ('label' in basePropTypes) {
    computedProps.label = renderLabel(fieldConfig);
  }

  if ('renderChildInputLabel' in basePropTypes) {
    computedProps.renderChildInputLabel = (childInput) => {
      const childName = childInput.props.name;
      const childFieldConfig = get(field, [childName, configKey]);

      return renderLabel(childFieldConfig, { key: childName });
    };
  }

  return (
    <BaseComponent
      {...computedProps}
      {...configuredProps}
      {...providedProps}
    />
  );
}

Field.contextTypes = contextTypes;
Field.propTypes = propTypes;
