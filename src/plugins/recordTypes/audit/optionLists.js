import { defineMessages } from 'react-intl';

// see: https://github.com/nuxeo/nuxeo/blob/master/modules/core/nuxeo-core-api/src/main/java/org/nuxeo/ecm/core/api/event/DocumentEventTypes.java
// and: https://doc.nuxeo.com/nxdoc/audit/#event
// for potential event types to add
export default {
  eventTypes: {
    values: [
      'beforeDocumentModification',
      'documentCreated',
      'lifecycle_transition_event',
    ],
    messages: defineMessages({
      beforeDocumentModification: {
        id: 'option.eventTypes.beforeDocumentModification',
        defaultMessage: 'Document modification',
      },
      documentCreated: {
        id: 'option.eventTypes.documentCreated',
        defaultMessage: 'Document created',
      },
      lifecycle_transition_event: {
        id: 'option.eventTypes.lifecycle_transition_event',
        defaultMessage: 'Lifecycle transition',
      },
    }),
  },
};
