import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default defineMessages({
  recordNameTitle: {
    id: 'record.group.nameTitle',
    description: 'The name of the record when used as a title.',
    defaultMessage: 'Group',
  },

  // Panels

  infoPanel: {
    id: 'panel.group.info',
    defaultMessage: 'Group Information',
  },

  // Fields

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
});
