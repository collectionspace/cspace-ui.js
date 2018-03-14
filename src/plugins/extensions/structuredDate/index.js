import fields from './fields';

export default () => configContext => ({
  extensions: {
    structuredDate: {
      fields: fields(configContext),
    },
  },
});
