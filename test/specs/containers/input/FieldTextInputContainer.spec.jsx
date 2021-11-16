import { defineMessages } from 'react-intl';
import { configKey } from '../../../../src/helpers/configHelpers';
import { formatHumanReadable } from '../../../../src/containers/input/FieldTextInputContainer';

chai.should();

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: (message) => `${message.defaultMessage}`,
  formatHTMLMessage: () => null,
  now: () => null,
};

const recordType = 'collectionobject';

const objectNumberConfig = {
  messages: defineMessages({
    name: {
      id: 'field.collectionobjects_common.objectNumber.name',
      defaultMessage: 'Identification number',
    },
  }),
};

const config = {
  recordTypes: {
    collectionobject: {
      fields: {
        document: {
          'ns2:collectionobjects_common': {
            objectNumber: {
              [configKey]: objectNumberConfig,
            },
          },
        },
      },
    },
  },
};

describe('FieldTextInputContainer', () => {
  it('should return human readable input when available', () => {
    const field = 'collectionobjects_common:objectNumber';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    formatted.should.equal('Identification number');
  });

  it('should return the field when formatting is not available', () => {
    const field = 'collectionspace_core:uri';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    formatted.should.equal(field);
  });
});
