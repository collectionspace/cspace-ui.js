import columns from '../../../../../src/plugins/recordTypes/all/columns';

chai.should();

describe('all record columns', function suite() {
  it('should have correct shape', function test() {
    columns.should.have.property('search').that.is.an('array');
  });

  it('should have docNumber column that is formatted as a refname display name', function test() {
    const docNumberColumn = columns.search.find(column => column.name === 'docNumber');

    docNumberColumn.should.have.property('formatValue').that.is.a('function');

    docNumberColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });

  it('should have docName column that is formatted as a refname display name', function test() {
    const docNameColumn = columns.search.find(column => column.name === 'docName');

    docNameColumn.should.have.property('formatValue').that.is.a('function');

    docNameColumn.formatValue('urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(johndoe)\'John Doe\'').should
      .equal('John Doe');
  });

  it('should have docType column that is formatted as a record type name from a service object name', function test() {
    const docTypeColumn = columns.search.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        object: {
          messages: {
            recordNameTitle: {
              id: 'record.object.nameTitle',
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
      .equal('formatted record.object.nameTitle');
  });

  it('should format the docType column with a fallback if no record type is found for the service object name', function test() {
    const docTypeColumn = columns.search.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        object: {
          messages: {
            recordNameTitle: {
              id: 'record.object.nameTitle',
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
});
