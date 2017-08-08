import columns from '../../../../../src/plugins/recordTypes/citation/columns';

chai.should();

describe('citation record columns', function suite() {
  const config = {
    recordTypes: {
      citation: {
        serviceConfig: {
          servicePath: 'citationauthorities',
        },
        vocabularies: {
          local: {
            messages: {
              name: {
                id: 'vocab.citation.local.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(citation)',
            },
          },
          worldcat: {
            messages: {
              name: {
                id: 'vocab.citation.worldcat.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(worldcat)',
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

    const refName = 'urn:cspace:core.collectionspace.org:citationauthorities:name(citation):item:name(NIH1484001439799)\'NIH\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.citation.local.name');
  });
});
