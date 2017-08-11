import columns from '../../../../../src/plugins/recordTypes/concept/columns';

chai.should();

describe('concept record columns', function suite() {
  const config = {
    recordTypes: {
      concept: {
        serviceConfig: {
          servicePath: 'conceptauthorities',
        },
        vocabularies: {
          associated: {
            messages: {
              name: {
                id: 'vocab.concept.associated.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(concept)',
            },
          },
          activity: {
            messages: {
              name: {
                id: 'vocab.concept.activity.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(activity)',
            },
          },
          material: {
            messages: {
              name: {
                id: 'vocab.concept.material.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(material_ca)',
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

    const refName = 'urn:cspace:core.collectionspace.org:conceptauthorities:name(concept):item:name(Cubism1484001439799)\'Cubism\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.concept.associated.name');
  });
});
