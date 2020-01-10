import fields from './fields';

export default () => (configContext) => ({
  extensions: {
    authItem: {
      fields: fields(configContext),
    },
  },
});
