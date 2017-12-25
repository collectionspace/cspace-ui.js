import createColumns from '../../../../../src/plugins/recordTypes/object/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('object record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have docNumber column with the proper shape', function test() {
    const docNumberColumn = columns.default.find(column => column.name === 'docType');

    docNumberColumn.should.have.property('messages').that.is.a('object');
    docNumberColumn.should.have.property('formatValue').that.is.a('function');
    docNumberColumn.should.have.property('width').that.is.a('number');
  });

  it('should have docNumber column that is formatted as a refname display name', function test() {
    const docNumberColumn = columns.default.find(column => column.name === 'docNumber');

    docNumberColumn.should.have.property('formatValue').that.is.a('function');

    docNumberColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });

  it('should have docType column with the proper shape', function test() {
    const docTypeColumn = columns.default.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('messages').that.is.a('object');
    docTypeColumn.should.have.property('formatValue').that.is.a('function');
    docTypeColumn.should.have.property('width').that.is.a('number');
  });

  it('should have docName column that is formatted as a refname display name', function test() {
    const docNameColumn = columns.default.find(column => column.name === 'docName');

    docNameColumn.should.have.property('formatValue').that.is.a('function');

    docNameColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });

  it('should have docType column that is formatted as a record type name from a service object name', function test() {
    const docTypeColumn = columns.default.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
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
      .equal('formatted record.collectionobject.name');
  });

  it('should format the docType column with a fallback if no record type is found for the service object name', function test() {
    const docTypeColumn = columns.default.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        collectionobject: {
          messages: {
            record: {
              name: {
                id: 'record.collectionobject.name',
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

  it('should have updated column with the proper shape', function test() {
    const updatedAtColumn = columns.default.find(column => column.name === 'updatedAt');

    updatedAtColumn.should.have.property('messages').that.is.a('object');
    updatedAtColumn.should.have.property('formatValue').that.is.a('function');
    updatedAtColumn.should.have.property('sortBy');
    updatedAtColumn.should.have.property('width').that.is.a('number');
  });

  it('should have updatedAt column that is formatted as a date', function test() {
    const updatedAtColumn = columns.default.find(column => column.name === 'updatedAt');

    const intl = {
      formatDate: value => `formatted ${value}`,
    };

    updatedAtColumn.formatValue('2017-01-04T05:20:36.377Z', { intl }).should
      .equal('formatted 2017-01-04T05:20:36.377Z');
  });
});
