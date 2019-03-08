import extensions from './extensions';
import invocables from './invocables';
import listTypes from './listTypes';
import optionLists from './optionLists';
import recordTypes from './recordTypes';
import subresources from './subresources';

export default [
  ...extensions,
  ...invocables,
  ...listTypes,
  ...optionLists,
  ...recordTypes,
  ...subresources,
];
