import createColumns from '../../../../../src/plugins/recordTypes/person/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('person record columns', function suite() {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  const config = {
    recordTypes: {
      person: {
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
    },
  };

  const intl = {
    formatMessage: message => `formatted ${message.id}`,
  };

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
    const vocabularyColumn = columns.default.vocabulary;

    vocabularyColumn.should.have.property('formatValue').that.is.a('function');

    const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.person.local.name');
  });
});
