import columns from '../../../../../src/plugins/recordTypes/location/columns';

chai.should();

describe('location record columns', function suite() {
  const config = {
    recordTypes: {
      location: {
        serviceConfig: {
          servicePath: 'locationauthorities',
        },
        vocabularies: {
          local: {
            messages: {
              name: {
                id: 'vocab.location.local.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(location)',
            },
          },
          offsite: {
            messages: {
              name: {
                id: 'vocab.location.offsite.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(offsite_sla)',
            },
          },
        },
      },
    },
  };

  const intl = {
    formatMessage: message => `formatted ${message.id}`,
  };

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
  });

  it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
    const vocabularyColumn = columns.default.find(column => column.name === 'vocabulary');

    vocabularyColumn.should.have.property('formatValue').that.is.a('function');

    const refName = 'urn:cspace:core.collectionspace.org:locationauthorities:name(location):item:name(BackRoom1484001439799)\'Back Room\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.location.local.name');
  });
});
