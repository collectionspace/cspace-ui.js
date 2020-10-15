import React from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import warning from 'warning';
import { getOptionList } from '../reducers';
import Field from '../components/record/Field';
import { DATA_TYPE_STRUCTURED_DATE } from '../constants/dataTypes';
import { formatExtensionFieldName } from '../helpers/formatHelpers';

import {
  configKey,
  getRecordFieldOptionListName,
  getRecordGroupOptionListName,
} from '../helpers/configHelpers';

import {
  ADD_OPTION_LISTS,
  DELETE_OPTION_LIST,
} from '../constants/actionCodes';

export const addOptionLists = (optionLists) => {
  const mergedOptionLists = {};

  Object.keys(optionLists).forEach((optionListName) => {
    const {
      values,
      messages,
    } = optionLists[optionListName];

    mergedOptionLists[optionListName] = values.map((value) => {
      const merged = {
        value,
      };

      const message = messages && messages[value];

      if (message) {
        merged.message = message;
      }

      return merged;
    });
  });

  return {
    type: ADD_OPTION_LISTS,
    payload: mergedOptionLists,
  };
};

export const deleteOptionList = (name) => ({
  type: DELETE_OPTION_LIST,
  payload: name,
});

const isSearchDisabled = (fieldConfig) => {
  const searchDisabled = get(fieldConfig, 'searchDisabled');

  // If searchDisabled is explicitly specified, return it.

  if (typeof searchDisabled !== 'undefined') {
    return !!searchDisabled;
  }

  // Otherwise, default to disabled if the field is not used on a form.

  const used = get(fieldConfig, 'used');

  return !used;
};

const collectLeafFields = (options, path, fieldDescriptor, level, includeStructDateFields) => {
  warning(
    typeof fieldDescriptor === 'object',
    `The value of the field descriptor at ${path.join('/')} is not an object. Did you forget a ${configKey} key?`,
  );

  if (typeof fieldDescriptor !== 'object') {
    return;
  }

  if (path[0] === 'rel:relations-common-list' || path[0] === 'ns2:contacts_common') {
    // Skip this part.

    return;
  }

  const config = fieldDescriptor[configKey];

  if (isSearchDisabled(config)) {
    return;
  }

  const dataType = get(config, 'dataType');

  const childFieldNames = Object.keys(fieldDescriptor).filter((key) => key !== configKey);
  const isLeaf = (childFieldNames.length === 0);

  if ((isLeaf || dataType === DATA_TYPE_STRUCTURED_DATE) && level > 0) {
    // Add this field to the result list.

    const option = {
      value: path.join('/'),
    };

    const extensionParentConfig = get(config, 'extensionParentConfig');
    const messages = get(config, 'messages');

    if (messages) {
      if (level > 1) {
        if (
          extensionParentConfig
          && extensionParentConfig.dataType === DATA_TYPE_STRUCTURED_DATE
        ) {
          // Construct the full label for a field inside a structured date.
          // If the level is 2, the structured date group (this field's parent) is at the top
          // level, so use the groupName message instead of the fullName.

          const messageName = (level === 2) ? 'groupName' : 'fullName';

          option.fieldConfig = config;

          option.labelFormatter = (intl, opt) => formatExtensionFieldName(
            intl, opt.fieldConfig, messageName,
          );
        } else {
          // Prefer the fullName message.
          option.message = messages.fullName;
        }
      } else {
        // This is a top-level field in a group. Prefer the groupName message.
        option.message = messages.groupName;
      }

      if (!option.labelFormatter && !option.message) {
        option.message = messages.name || messages.fullName;
      }
    }

    options.push(option);
  }

  if (!isLeaf && (dataType !== DATA_TYPE_STRUCTURED_DATE || includeStructDateFields)) {
    childFieldNames.forEach((childFieldName) => {
      collectLeafFields(
        options,
        [...path, childFieldName],
        fieldDescriptor[childFieldName],
        level + 1,
        includeStructDateFields,
      );
    });
  }
};

const collectGroupFields = (options, path, fieldDescriptor, level) => {
  warning(
    typeof fieldDescriptor === 'object',
    `The value of the field descriptor at ${path.join('/')} is not an object. Did you forget a ${configKey} key?`,
  );

  if (typeof fieldDescriptor !== 'object') {
    return;
  }

  const config = fieldDescriptor[configKey];

  if (isSearchDisabled(config)) {
    return;
  }

  const childFieldNames = Object.keys(fieldDescriptor).filter((key) => key !== configKey);

  const isGroup = (
    // Omit first-level groups, which are the document parts.
    (path.length > 1)
    // Omit containers for repeating scalars, which will have just one child.
    && (childFieldNames.length > 1)
  );

  if (isGroup && level > 0) {
    const option = {
      value: path.join('/'),
    };

    // Add this group to the result list.

    const messages = get(config, 'messages');

    if (messages) {
      if (level > 1) {
        // Prefer the fullName message.
        option.message = messages.fullName;
      } else {
        // This is a top-level group in a group. Prefer the groupName message.
        option.message = messages.groupName;
      }

      if (!option.message) {
        option.message = messages.name || messages.fullName;
      }
    }

    options.push(option);
  }

  // Collect the child groups.

  childFieldNames.forEach((childFieldName) => {
    collectGroupFields(
      options,
      [...path, childFieldName],
      fieldDescriptor[childFieldName],
      level + 1,
    );
  });
};

const getRecordFieldOptions = (fields, rootPath, includeStructDateFields) => {
  const path = rootPath ? rootPath.split('/') : [];
  const rootFieldDescriptor = get(fields, ['document', ...path]);
  const options = [];

  if (rootFieldDescriptor) {
    collectLeafFields(options, path, rootFieldDescriptor, 0, includeStructDateFields);
  }

  return options;
};

const getRecordGroupOptions = (fields, rootPath) => {
  const path = rootPath ? rootPath.split('/') : [];
  const rootFieldDescriptor = get(fields, ['document', ...path]);
  const options = [];

  if (rootFieldDescriptor) {
    collectGroupFields(options, path, rootFieldDescriptor, 0);
  }

  return options;
};

const markComponentFields = (fieldDescriptor, component, parentPath = []) => {
  const { props, type } = component;
  const { children, name } = props;

  let componentFieldDescriptor = fieldDescriptor;
  let path = parentPath;

  if (type === Field) {
    let { subpath } = props;

    if (typeof subpath === 'undefined') {
      subpath = get(fieldDescriptor, [configKey, 'view', 'props', 'defaultChildSubpath']);
    }

    if (!subpath) {
      subpath = [];
    } else if (!Array.isArray(subpath)) {
      subpath = subpath.split('/');
    }

    const relativePath = [...subpath, name];

    relativePath.forEach((fieldName) => {
      if (componentFieldDescriptor) {
        componentFieldDescriptor = componentFieldDescriptor[fieldName];

        if (componentFieldDescriptor) {
          set(componentFieldDescriptor, [configKey, 'used'], true);
        }
      }
    });

    path = [...parentPath, ...relativePath];
  }

  React.Children.forEach(children, (child) => {
    markComponentFields(componentFieldDescriptor, child, path);
  });
};

const markFormUsedFields = (fields, form) => {
  markComponentFields(fields, form.template);
};

/*
 * Scan forms for fields that are used, and mark them by setting the used property in the field
 * configuration.
 */
const markUsedFields = (fields, forms = {}) => {
  Object.keys(forms).forEach((formName) => {
    markFormUsedFields(fields, forms[formName]);
  });
};

export const buildRecordFieldOptionLists = (
  config,
  recordType,
  rootPath,
  includeStructDateFields = true,
) => (dispatch, getState) => {
  const fieldOptionListName = getRecordFieldOptionListName(recordType, rootPath);
  const fieldOptionList = getOptionList(getState(), fieldOptionListName);

  const groupOptionListName = getRecordGroupOptionListName(recordType, rootPath);
  const groupOptionList = getOptionList(getState(), groupOptionListName);

  if (fieldOptionList && groupOptionList) {
    // The option lists already exist.

    return undefined;
  }

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const { fields, forms } = recordTypeConfig;
  const lists = {};

  if (!recordTypeConfig.usedFieldsMarked) {
    markUsedFields(fields, forms);

    recordTypeConfig.usedFieldsMarked = true;
  }

  if (!fieldOptionList) {
    lists[fieldOptionListName] = getRecordFieldOptions(fields, rootPath, includeStructDateFields);
  }

  if (!groupOptionList) {
    lists[groupOptionListName] = getRecordGroupOptions(fields, rootPath);
  }

  return dispatch({
    type: ADD_OPTION_LISTS,
    payload: lists,
  });
};
