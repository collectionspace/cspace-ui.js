import columns from '../../../../../src/plugins/recordTypes/authority/columns';

chai.should();

describe('authority record columns', function suite() {
  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have docType column that is formatted as a record type name from a service object name', function test() {
    const docTypeColumn = columns.default.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        object: {
          messages: {
            record: {
              recordNameTitle: {
                id: 'record.object.nameTitle',
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
      .equal('formatted record.object.nameTitle');
  });

  it('should format the docType column with a fallback if no record type is found for the service object name', function test() {
    const docTypeColumn = columns.default.find(column => column.name === 'docType');

    docTypeColumn.should.have.property('formatValue').that.is.a('function');

    const config = {
      recordTypes: {
        object: {
          messages: {
            record: {
              recordNameTitle: {
                id: 'record.object.nameTitle',
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
});
