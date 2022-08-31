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
  [configKey]: {
    messages: defineMessages({
      name: {
        id: 'field.collectionobjects_common.objectNumber.name',
        defaultMessage: 'Identification number',
      },
    }),
  },
};

const commentsConfig = {
  comment: {
    [configKey]: {
      messages: defineMessages({
        name: {
          id: 'field.collectionobjects_common.comment.name',
          defaultMessage: 'Comment',
        },
      }),
    },
  },
};

const titleGroupListConfig = {
  titleGroup: {
    [configKey]: {
      messages: defineMessages({
        name: {
          id: 'field.collectionobjects_common.titleGroup.name',
          defaultMessage: 'Title',
        },
      }),

    },
    titleLanguage: {
      [configKey]: {
        messages: defineMessages({
          name: {
            id: 'field.collectionobjects_common.titleLanguage.name',
            defaultMessage: 'Title language',
          },
        }),
      },
    },
  },
};

const config = {
  recordTypes: {
    collectionobject: {
      fields: {
        document: {
          'ns2:collectionobjects_common': {
            objectNumber: objectNumberConfig,
            comments: commentsConfig,
            titleGroupList: titleGroupListConfig,
          },
        },
      },
    },
  },
};

describe('FieldTextInputContainer', () => {
  it('should return the default message for fields', () => {
    const field = 'collectionobjects_common:objectNumber';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    formatted.should.equal('Identification number');
  });

  it('should return the child message for lists', () => {
    const field = 'collectionobjects_common:comments:03E8';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    formatted.should.equal('Comment');
  });

  it('should return the group message for GroupLists', () => {
    const field = 'collectionobjects_common:titleGroupList';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    formatted.should.equal('Title');
  });

  it('should return the group, index, and item for GroupList items', () => {
    const field = 'collectionobjects_common:titleGroupList/0/titleLanguage';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    // would be nice to have an actual intl fill this in
    formatted.should.equal('{groupList} #{index} — {listItem}');
  });

  it('should return the field when formatting is not available', () => {
    const field = 'collectionspace_core:uri';
    const formatted = formatHumanReadable(recordType, field, { intl, config });
    formatted.should.equal(field);
  });
});
