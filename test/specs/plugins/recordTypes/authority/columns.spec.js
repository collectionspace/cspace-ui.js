import createColumns from '../../../../../src/plugins/recordTypes/authority/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('authority record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have docType column that is formatted as a record type name from a service object name', function test() {
    const docTypeColumn = columns.default.docType;

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        object: {
          messages: {
            record: {
              name: {
                id: 'record.object.name',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    docTypeColumn.formatValue('CollectionObject', { intl, config }).should
      .equal('formatted record.object.name');
  });

  it('should format the docType column with a fallback if no record type is found for the service object name', function test() {
    const docTypeColumn = columns.default.docType;

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        object: {
          messages: {
            record: {
              name: {
                id: 'record.object.name',
              },
            },
          },
          serviceConfig: {
            objectName: 'CollectionObject',
          },
        },
      },
    };

    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    docTypeColumn.formatValue('Group', { intl, config }).should
      .equal('[ group ]');
  });

  it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
    const vocabularyColumn = columns.default.vocabulary;

    vocabularyColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        person: {
          serviceConfig: {
            servicePath: 'personauthorities',
          },
          vocabularies: {
            local: {
              messages: {
                name: {
                  id: 'vocab.person.local.name',
                },
              },
              serviceConfig: {
                servicePath: 'urn:cspace:name(person)',
              },
            },
          },
        },
      },
    };

    const intl = {
      formatMessage: message => `formatted ${message.id}`,
    };

    const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.person.local.name');
  });
});
