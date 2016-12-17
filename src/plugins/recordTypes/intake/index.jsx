import { defineMessages } from 'react-intl';

export default () => () => ({
  idGenerators: {
    intake: {
      csid: '8088cfa5-c743-4824-bb4d-fb11b12847f7',
      messageDescriptors: defineMessages({
        type: {
          id: 'idGenerator.intake.type',
          defaultMessage: 'Intake',
        },
      }),
    },
  },
});
