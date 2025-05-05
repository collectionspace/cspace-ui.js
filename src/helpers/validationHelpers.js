import { ERROR_KEY } from './recordDataHelpers';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
// eslint-disable-next-line max-len
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail = (email) => emailPattern.test(email);

const isBlocking = (validationError) => {
  const nonblocking = validationError.get('nonblocking');

  return (typeof nonblocking === 'undefined') ? true : !nonblocking;
};

export const isValidLength = (value, length) => {
  // use the TextEncoder in case any utf8 characters are present
  const encoder = new TextEncoder();
  return encoder.encode(value).length <= length;
};

export const hasBlockingError = (validationErrors) => {
  if (!validationErrors) {
    return false;
  }
  const error = validationErrors.get(ERROR_KEY);

  if (error && isBlocking(error)) {
    return true;
  }

  return validationErrors
    .entrySeq()
    .filter(([key]) => (key !== ERROR_KEY))
    // eslint-disable-next-line no-unused-vars
    .find(([key, child]) => hasBlockingError(child));
};

export const validateNotInUse = ({
  configContext,
  validationContext,
  fieldName,
}) => {
  const {
    actions,
    config,
    configHelpers,
    lib,
  } = configContext;

  const {
    csid,
    data: value,
    recordType,
  } = validationContext;

  const {
    findFirst,
  } = actions;

  if (!value) {
    return undefined;
  }

  return findFirst(config, recordType, fieldName, value)
    .then((response) => {
      const { lodash } = lib;

      const existingCsid = lodash.get(
        response,
        ['data', 'ns2:abstract-common-list', 'list-item', 'csid'],
      );

      if (existingCsid && (existingCsid !== csid)) {
        const { fieldDescriptor } = validationContext;

        return {
          value,
          code: 'ID_IN_USE',
          message: lodash.get(fieldDescriptor, [configHelpers.configKey, 'messages', 'inUse']),
          nonblocking: true,
        };
      }

      return undefined;
    });
};
