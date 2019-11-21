import get from 'lodash/get';
import warning from 'warning';
import { getOptionList } from '../reducers';
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

export const deleteOptionList = name => ({
  type: DELETE_OPTION_LIST,
  payload: name,
});

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
  const dataType = get(config, 'dataType');

  const childFieldNames = Object.keys(fieldDescriptor).filter(key => key !== configKey);
  const isLeaf = (childFieldNames.length === 0);

  if ((isLeaf || dataType === DATA_TYPE_STRUCTURED_DATE) && level > 0) {
    // Add this field to the result list.

    const option = {
      value: path.join('/'),
    };

    const extensionParentConfig = get(config, 'extensionParentConfig');
    const messages = get(config, 'messages');

    if (messages) {
      if (extensionParentConfig && extensionParentConfig.dataType === DATA_TYPE_STRUCTURED_DATE) {
        // Special case for constructing the label for fields in structured dates.

        if (level > 1) {
          option.fieldConfig = config;
          option.labelFormatter = (intl, opt) => formatExtensionFieldName(intl, opt.fieldConfig);
        } else {
          option.message = messages.name || messages.fullName;
        }
      } else {
        let message;

        if (level > 1) {
          message = messages.fullName;
        }

        if (!message) {
          message = messages.name || messages.fullName;
        }

        if (message) {
          option.message = message;
        }
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
  const childFieldNames = Object.keys(fieldDescriptor).filter(key => key !== configKey);

  const isGroup =
    // Omit first-level groups, which are the document parts.
    (path.length > 1)
    // Omit containers for repeating scalars, which will have just one child.
    && (childFieldNames.length > 1);

  if (isGroup && level > 0) {
    const option = {
      value: path.join('/'),
    };

    // Add this group to the result list.

    const messages = get(config, 'messages');

    if (messages) {
      let message;

      if (level > 1) {
        message = messages.fullName;
      }

      if (!message) {
        message = messages.name || messages.fullName;
      }

      if (message) {
        option.message = message;
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
      level + 1
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

  const fields = get(config, ['recordTypes', recordType, 'fields']);
  const lists = {};

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
