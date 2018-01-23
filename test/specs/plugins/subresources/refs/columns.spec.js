import Immutable from 'immutable';
import columns from '../../../../../src/plugins/subresources/refs/columns';
import { configKey } from '../../../../../src/helpers/configHelpers';

chai.should();

describe('refs subresource columns', function suite() {
  const config = {
    recordTypes: {
      person: {
        messages: {
          record: {
            name: {
              id: 'record.person.name',
            },
          },
        },
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
      collectionobject: {
        name: 'collectionobject',
        messages: {
          record: {
            name: {
              id: 'record.collectionobject.name',
            },
          },
        },
        fields: {
          document: {
            'ns2:collectionobjects_common': {
              objectProductionPersonGroupList: {
                objectProductionPersonGroup: {
                  objectProductionPerson: {
                    [configKey]: {
                      messages: {
                        fullName: {
                          id: 'field.collectionobjects_common.objectProductionPerson.fullName',
                          defaultMessage: 'Production person',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        serviceConfig: {
          objectName: 'CollectionObject',
          servicePath: 'collectionobjects',
        },
      },
    },
  };

  const intl = {
    formatMessage: message => `formatted ${message.id}`,
  };

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
    columns.should.have.property('narrow').that.is.an('object');
  });

  describe('default column set', function setTest() {
    it('should have docNumber column that is formatted as a refname display name', function test() {
      const docNumberColumn = columns.default.docNumber;

      docNumberColumn.should.have.property('formatValue').that.is.a('function');

      docNumberColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
        .equal('John Doe');
    });

    it('should have docName column that is formatted as a refname display name', function test() {
      const docNameColumn = columns.default.docName;

      docNameColumn.should.have.property('formatValue').that.is.a('function');

      docNameColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
        .equal('John Doe');
    });

    it('should have docType column that is formatted as a record type name from a service object name', function test() {
      const docTypeColumn = columns.default.docType;

      docTypeColumn.should.have.property('formatValue').that.is.a('function');

      docTypeColumn.formatValue('CollectionObject', { intl, config }).should
        .equal('formatted record.collectionobject.name');
    });

    it('should have sourceField column that is formatted as a field name from a part and field ids', function test() {
      const sourceFieldColumn = columns.default.sourceField;

      sourceFieldColumn.should.have.property('formatValue').that.is.a('function');

      const sourceField = 'collectionobjects_common:objectProductionPerson';

      const rowData = Immutable.Map({
        docType: 'CollectionObject',
      });

      sourceFieldColumn.formatValue(sourceField, { intl, config, rowData }).should
        .equal('formatted field.collectionobjects_common.objectProductionPerson.fullName');
    });

    it('should format the sourceField column with a fallback if no field is found with the id', function test() {
      const sourceFieldColumn = columns.default.sourceField;
      const sourceField = 'collectionobjects_common:foobar';

      const rowData = Immutable.Map({
        docType: 'CollectionObject',
      });

      sourceFieldColumn.formatValue(sourceField, { intl, config, rowData }).should
        .equal('[ foobar ]');
    });
  });

  describe('narrow column set', function setTest() {
    it('should have docNumber column that is formatted as a refname display name', function test() {
      const docNumberColumn = columns.narrow.docNumber;

      docNumberColumn.should.have.property('formatValue').that.is.a('function');

      docNumberColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
        .equal('John Doe');
    });

    it('should have docName column that is formatted as a refname display name', function test() {
      const docNameColumn = columns.narrow.docName;

      docNameColumn.should.have.property('formatValue').that.is.a('function');

      docNameColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
        .equal('John Doe');
    });

    it('should have docType column that is formatted as a record type name from a service object name', function test() {
      const docTypeColumn = columns.narrow.docType;

      docTypeColumn.should.have.property('formatValue').that.is.a('function');

      docTypeColumn.formatValue('CollectionObject', { intl, config }).should
        .equal('formatted record.collectionobject.name');
    });

    it('should have sourceField column that is formatted as a field name from a part and field ids', function test() {
      const sourceFieldColumn = columns.narrow.sourceField;

      sourceFieldColumn.should.have.property('formatValue').that.is.a('function');

      const sourceField = 'collectionobjects_common:objectProductionPerson';

      const rowData = Immutable.Map({
        docType: 'CollectionObject',
      });

      sourceFieldColumn.formatValue(sourceField, { intl, config, rowData }).should
        .equal('formatted field.collectionobjects_common.objectProductionPerson.fullName');
    });

    it('should format the sourceField column with a fallback if no field is found with the id', function test() {
      const sourceFieldColumn = columns.narrow.sourceField;
      const sourceField = 'collectionobjects_common:foobar';

      const rowData = Immutable.Map({
        docType: 'CollectionObject',
      });

      sourceFieldColumn.formatValue(sourceField, { intl, config, rowData }).should
        .equal('[ foobar ]');
    });
  });
});
