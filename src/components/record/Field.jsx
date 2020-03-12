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
  isFieldViewReadOnly,
} from '../../helpers/configHelpers';

import {
  DateInput,
  StructuredDateInput,
} from '../../helpers/configContextInputs';

const {
  getPath,
  pathPropType,
} = inputHelpers.pathHelpers;

const { Label } = inputComponents;

const renderLabel = (fieldDescriptor, providedLabelMessage, computeContext, props) => {
  const fieldConfig = fieldDescriptor[configKey];
  const message = providedLabelMessage || get(fieldConfig, ['messages', 'name']);

  if (!message) {
    return null;
  }

  const configuredProps = {};

  if ('required' in fieldConfig) {
    configuredProps.required = isFieldRequired(computeContext);
  }

  const viewReadOnly = isFieldViewReadOnly(computeContext);

  if (typeof viewReadOnly !== 'undefined') {
    configuredProps.readOnly = viewReadOnly;
  }

  return (
    <Label {...props} {...configuredProps}>
      <FormattedMessage {...message} />
    </Label>
  );
};

const propTypes = {
  labelMessage: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  viewType: PropTypes.string,

  // Code in this component doesn't use these props, but the propTypes need to exist, because
  // users of this component may check for them to determine if those props should be passed.
  // We want to receive all the props that our base components may need, and then we'll handle
  // distributing them to the base components that accept them.

  /* eslint-disable react/no-unused-prop-types */
  name: PropTypes.string,
  // The value prop will be validated by the base component, so allow anything here.
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  parentPath: PropTypes.arrayOf(PropTypes.string),
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
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  formName: PropTypes.string,
  intl: intlShape,
  recordData: PropTypes.instanceOf(Immutable.Map),
  recordType: PropTypes.string,
  recordTypeConfig: PropTypes.shape({
    fields: PropTypes.object,
  }),
  roleNames: PropTypes.instanceOf(Immutable.List),
  subrecordData: PropTypes.instanceOf(Immutable.Map),
};

export default function Field(props, context) {
  const {
    config,
    formName,
    intl,
    recordData,
    recordType,
    roleNames,
    subrecordData,
    recordTypeConfig: contextRecordTypeConfig,
  } = context;

  const {
    labelMessage,
    viewType,
  } = props;

  const recordTypeConfig = contextRecordTypeConfig || get(config, ['recordTypes', recordType]);
  const fullPath = getPath(props);

  // Filter out numeric parts of the path, since they indicate repeating instances that won't be
  // present in the field descriptor.

  const path = dataPathToFieldDescriptorPath(fullPath);
  const fields = get(recordTypeConfig, 'fields');

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
  const isSearch = (viewType === 'search');

  const viewConfig = isSearch
    ? fieldConfig.searchView || fieldConfig.view
    : fieldConfig.view;

  let BaseComponent = viewConfig.type;

  if (isSearch && !fieldConfig.searchView && BaseComponent === StructuredDateInput) {
    // If a search view was not explicitly configured, and the view is a StructuredDateInput,
    // automatically make the search view a DateInput.

    BaseComponent = DateInput;
  }

  const configuredProps = viewConfig.props || {};
  const providedProps = {};

  // FIXME: Do this without looking at the base component propTypes, so that propTypes can be
  // removed in production builds.
  // eslint-disable-next-line react/forbid-foreign-prop-types
  const basePropTypes = BaseComponent.propTypes;

  Object.keys(props).forEach((propName) => {
    if (propName in basePropTypes) {
      providedProps[propName] = props[propName];
    }
  });

  const computeContext = {
    isSearch,
    path,
    recordData,
    subrecordData,
    fieldDescriptor: field,
    recordType,
    form: formName,
    roleNames,
  };

  const effectiveReadOnly = providedProps.readOnly || isFieldViewReadOnly(computeContext);
  const computedProps = {};

  if (fieldConfig.repeating && viewType !== 'search') {
    computedProps.repeating = fieldConfig.repeating;
  }

  if ('label' in basePropTypes) {
    computedProps.label = renderLabel(field, labelMessage, computeContext, {
      readOnly: effectiveReadOnly,
    });
  }

  if ('formatValue' in basePropTypes) {
    const valueMessage = get(fieldConfig, ['messages', 'value']);

    if (valueMessage) {
      computedProps.formatValue = (value) => intl.formatMessage(valueMessage, { value });
    }
  }

  if ('renderChildInputLabel' in basePropTypes) {
    computedProps.renderChildInputLabel = (childInput) => {
      const childName = childInput.props.name;
      const childLabelMessage = childInput.props.labelMessage;
      const childField = field[childName];

      const childComputeContext = {
        path: [...path, childName],
        recordData,
        subrecordData,
        fieldDescriptor: childField,
        recordType,
        form: formName,
        roleNames,
      };

      return (childField && renderLabel(childField, childLabelMessage, childComputeContext, {
        key: childName,
        readOnly: effectiveReadOnly,
      }));
    };
  }

  if ('viewType' in basePropTypes) {
    computedProps.viewType = viewType;
  }

  const effectiveProps = {
    ...computedProps, ...configuredProps, ...providedProps, readOnly: effectiveReadOnly,
  };

  return (
    <BaseComponent {...effectiveProps} />
  );
}

Field.contextTypes = contextTypes;
Field.propTypes = propTypes;
