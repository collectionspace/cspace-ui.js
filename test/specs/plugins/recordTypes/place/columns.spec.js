import columns from '../../../../../src/plugins/recordTypes/place/columns';

chai.should();

describe('place record columns', function suite() {
  const config = {
    recordTypes: {
      place: {
        serviceConfig: {
          servicePath: 'placeauthorities',
        },
        vocabularies: {
          local: {
            messages: {
              name: {
                id: 'vocab.place.local.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(place)',
            },
          },
          offsite: {
            messages: {
              name: {
                id: 'vocab.place.tgn.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(tgn_place)',
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

    const refName = 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(LakeTahoe1484001439799)\'Lake Tahoe\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.place.local.name');
  });
});
