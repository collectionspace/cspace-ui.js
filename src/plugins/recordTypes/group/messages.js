import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  record: defineMessages({
    recordNameTitle: {
      id: 'record.group.nameTitle',
      description: 'The name of the record when used as a title.',
      defaultMessage: 'Group',
    },
    resultsTitle: {
      id: 'record.group.resultsTitle',
      description: 'The name of the record when used as a title describing search results.',
      defaultMessage: 'Groups',
    },
  }),
  panel: defineMessages({
    infoPanel: {
      id: 'panel.group.info',
      defaultMessage: 'Group Information',
    },
  }),
  field: defineMessages({
    title: {
      id: 'field.group.title',
      defaultMessage: 'Title',
    },
    responsibleDepartment: {
      id: 'field.group.responsibleDepartment',
      defaultMessage: 'Responsible department',
    },
    owner: {
      id: 'field.group.owner',
      defaultMessage: 'Group owner',
    },
    scopeNote: {
      id: 'field.group.scopeNote',
      defaultMessage: 'Scope note',
    },
  }),
};
