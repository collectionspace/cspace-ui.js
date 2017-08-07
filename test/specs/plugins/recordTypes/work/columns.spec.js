import columns from '../../../../../src/plugins/recordTypes/work/columns';

chai.should();

describe('work record columns', function suite() {
  const config = {
    recordTypes: {
      work: {
        serviceConfig: {
          servicePath: 'workauthorities',
        },
        vocabularies: {
          local: {
            messages: {
              name: {
                id: 'vocab.work.local.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(work)',
            },
          },
          cona: {
            messages: {
              name: {
                id: 'vocab.work.cona.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(cona_work)',
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

    const refName = 'urn:cspace:core.collectionspace.org:workauthorities:name(work):item:name(Hamilton1484001439799)\'Hamilton\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.work.local.name');
  });
});
