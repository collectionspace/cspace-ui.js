import Immutable from 'immutable';
import WorkflowStateIcon from '../../../src/components/record/WorkflowStateIcon';

import {
  formatForeignSourceField,
  formatRecordTypeSourceField,
  formatRefNameAsRecordType,
  formatRefNameAsVocabularyName,
  formatServiceObjectName,
  formatSourceField,
  formatTimestamp,
  formatWorkflowStateIcon,
} from '../../../src/helpers/formatHelpers';

import {
  configKey,
} from '../../../src/helpers/configHelpers';

describe('formatHelpers', function moduleSuite() {
  describe('formatTimestamp', function suite() {
    const intl = {
      formatDate: value => `formatted ${value}`,
    };

    it('should return a formatted timestamp', function test() {
      formatTimestamp('2017-01-04T05:20:36.377Z', { intl }).should
        .equal('formatted 2017-01-04T05:20:36.377Z');
    });
  });

  describe('formatServiceObjectName', function suite() {
    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted record type name', function test() {
      formatServiceObjectName('CollectionObject', { intl, config }).should
        .equal('formatted record.collectionobject.name');
    });

    it('should return a placeholder if the record type is unknown', function test() {
      formatServiceObjectName('SomethingElse', { intl, config }).should
        .equal('[ somethingelse ]');
    });
  });

  describe('formatRefNameAsRecordType', function suite() {
    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        person: {
          messages: {
            record: {
              name: {
                id: 'record.person.name',
                defaultMessage: 'record.person.name message',
              },
            },
          },
          serviceConfig: {
            servicePath: 'personauthorities',
          },
        },
      },
    };

    it('should return a formatted record type name', function test() {
      formatRefNameAsRecordType('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('formatted record.person.name');
    });

    it('should return a placeholder if the record type is unknown', function test() {
      formatRefNameAsRecordType('urn:cspace:core.collectionspace.org:something:name(person):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('[ something ]');
    });
  });

  describe('formatRefNameAsVocabularyName', function suite() {
    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        person: {
          messages: {
            record: {
              name: {
                id: 'record.person.name',
                defaultMessage: 'record.person.name message',
              },
            },
          },
          serviceConfig: {
            servicePath: 'personauthorities',
          },
          vocabularies: {
            ulan: {
              messages: {
                name: {
                  id: 'vocab.person.ulan.name',
                  defaultMessage: 'vocab.person.ulan.name message',
                },
              },
              serviceConfig: {
                servicePath: 'urn:cspace:name(ulan_pa)',
              },
            },
          },
        },
      },
    };

    it('should return a formatted vocabulary name', function test() {
      formatRefNameAsVocabularyName('urn:cspace:core.collectionspace.org:personauthorities:name(ulan_pa):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('formatted vocab.person.ulan.name');
    });

    it('should return a placeholder if the record type is unknown', function test() {
      formatRefNameAsVocabularyName('urn:cspace:core.collectionspace.org:something:name(ulan_pa):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('[ something ]');
    });

    it('should return a placeholder if the vocabulary is unknown', function test() {
      formatRefNameAsVocabularyName('urn:cspace:core.collectionspace.org:personauthorities:name(oh_no):item:name(JohnDoe1507580521121)\'John Doe\'', { intl, config }).should
        .equal('[ oh_no ]');
    });
  });

  describe('formatRecordTypeSourceField', function suite() {
    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                fieldCollector: {
                  [configKey]: {
                    messages: {
                      name: {
                        id: 'field.collectionobjects_common.fieldCollector.name',
                        defaultMessage: 'field.collectionobjects_common.fieldCollector.name message',
                      },
                    },
                  },
                },
              },
            },
          },
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted field name', function test() {
      formatRecordTypeSourceField('collectionobject', 'collectionobjects_common:fieldCollector', { intl, config }).should
        .equal('formatted field.collectionobjects_common.fieldCollector.name');
    });
  });

  describe('formatSourceField', function suite() {
    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                fieldCollector: {
                  [configKey]: {
                    messages: {
                      name: {
                        id: 'field.collectionobjects_common.fieldCollector.name',
                        defaultMessage: 'field.collectionobjects_common.fieldCollector.name message',
                      },
                    },
                  },
                },
              },
            },
          },
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted field name', function test() {
      formatSourceField('collectionobjects_common:fieldCollector', { intl, config, recordType: 'collectionobject' }).should
        .equal('formatted field.collectionobjects_common.fieldCollector.name');
    });
  });

  describe('formatForeignSourceField', function suite() {
    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const config = {
      recordTypes: {
        collectionobject: {
          fields: {
            document: {
              'ns2:collectionobjects_common': {
                fieldCollector: {
                  [configKey]: {
                    messages: {
                      name: {
                        id: 'field.collectionobjects_common.fieldCollector.name',
                        defaultMessage: 'field.collectionobjects_common.fieldCollector.name message',
                      },
                    },
                  },
                },
              },
            },
          },
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
                defaultMessage: 'record.collectionobject.name message',
              },
            },
          },
          name: 'collectionobject',
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    it('should return a formatted field name', function test() {
      formatForeignSourceField('collectionobjects_common:fieldCollector', {
        intl,
        config,
        rowData: Immutable.Map({
          docType: 'CollectionObject',
        }),
      }).should.equal('formatted field.collectionobjects_common.fieldCollector.name');
    });
  });

  describe('formatWorkflowStateIcon', function suite() {
    it('should return a WorkflowStateIcon', function test() {
      const icon = formatWorkflowStateIcon('locked');

      icon.should.have.property('type', WorkflowStateIcon);
    });
  });
});
