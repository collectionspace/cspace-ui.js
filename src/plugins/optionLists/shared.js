import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

/**
 * This plugin provides option lists that are shared by multiple record types. Option lists that
 * are used by only one record type are defined in the plugin for that record type.
 */
export default () => ({
  optionLists: {
    departments: {
      values: [
        'antiquities',
        'architecture-design',
        'decorative-arts',
        'ethnography',
        'herpetology',
        'media-performance-art',
        'paintings-sculpture',
        'paleobotany',
        'photographs',
        'prints-drawings',
      ],
      messageDescriptors: defineMessages({
        antiquities: {
          id: 'option.departments.antiquities',
          defaultMessage: 'Antiquities',
        },
        'architecture-design': {
          id: 'option.departments.architecture-design',
          defaultMessage: 'Architecture and Design',
        },
        'decorative-arts': {
          id: 'option.departments.decorative-arts',
          defaultMessage: 'Decorative Arts',
        },
        ethnography: {
          id: 'option.departments.ethnography',
          defaultMessage: 'Ethnography',
        },
        herpetology: {
          id: 'option.departments.herpetology',
          defaultMessage: 'Herpetology',
        },
        'media-performance-art': {
          id: 'option.departments.media-performance-art',
          defaultMessage: 'Media and Performance Art',
        },
        'paintings-sculpture': {
          id: 'option.departments.paintings-sculpture',
          defaultMessage: 'Paintings and Sculpture',
        },
        paleobotany: {
          id: 'option.departments.paleobotany',
          defaultMessage: 'Paleobotany',
        },
        photographs: {
          id: 'option.departments.photographs',
          defaultMessage: 'Photographs',
        },
        'prints-drawings': {
          id: 'option.departments.prints-drawings',
          defaultMessage: 'Prints and Drawings',
        },
      }),
    },
  },
});
