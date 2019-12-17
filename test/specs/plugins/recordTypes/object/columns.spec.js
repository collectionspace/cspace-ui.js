import createColumns from '../../../../../src/plugins/recordTypes/object/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('object record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  it('should have correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have docNumber column with the proper shape', () => {
    const docNumberColumn = columns.default.docType;

    docNumberColumn.should.have.property('messages').that.is.a('object');
    docNumberColumn.should.have.property('formatValue').that.is.a('function');
    docNumberColumn.should.have.property('width').that.is.a('number');
  });

  it('should have docNumber column that is formatted as a refname display name', () => {
    const docNumberColumn = columns.default.docNumber;

    docNumberColumn.should.have.property('formatValue').that.is.a('function');

    docNumberColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });

  it('should have docType column with the proper shape', () => {
    const docTypeColumn = columns.default.docType;

    docTypeColumn.should.have.property('messages').that.is.a('object');
    docTypeColumn.should.have.property('formatValue').that.is.a('function');
    docTypeColumn.should.have.property('width').that.is.a('number');
  });

  it('should have docName column that is formatted as a refname display name', () => {
    const docNameColumn = columns.default.docName;

    docNameColumn.should.have.property('formatValue').that.is.a('function');

    docNameColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });

  it('should have docType column that is formatted as a record type name from a service object name', () => {
    const docTypeColumn = columns.default.docType;

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
      formatMessage: (message) => `formatted ${message.id}`,
    };

    docTypeColumn.formatValue('CollectionObject', { intl, config }).should
      .equal('formatted record.collectionobject.name');
  });

  it('should format the docType column with a fallback if no record type is found for the service object name', () => {
    const docTypeColumn = columns.default.docType;

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
      formatMessage: (message) => `formatted ${message.id}`,
    };

    docTypeColumn.formatValue('Group', { intl, config }).should
      .equal('[ group ]');
  });

  it('should have updated column with the proper shape', () => {
    const updatedAtColumn = columns.default.updatedAt;

    updatedAtColumn.should.have.property('messages').that.is.a('object');
    updatedAtColumn.should.have.property('formatValue').that.is.a('function');
    updatedAtColumn.should.have.property('sortBy');
    updatedAtColumn.should.have.property('width').that.is.a('number');
  });

  it('should have updatedAt column that is formatted as a date', () => {
    const updatedAtColumn = columns.default.updatedAt;

    const intl = {
      formatDate: (value) => `formatted ${value}`,
    };

    updatedAtColumn.formatValue('2017-01-04T05:20:36.377Z', { intl }).should
      .equal('formatted 2017-01-04T05:20:36.377Z');
  });
});
