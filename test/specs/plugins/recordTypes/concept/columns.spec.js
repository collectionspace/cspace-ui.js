import createColumns from '../../../../../src/plugins/recordTypes/concept/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('concept record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  const config = {
    optionLists: {
      conceptTermStatuses: {
        messages: {
          value1: {
            id: 'option.conceptTermStatuses.value1',
            defaultMessage: 'Value 1',
          },
        },
      },
    },
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

  it('should have term status column that is formatted as an option list value', function test() {
    const termStatusColumn = columns.default.find(column => column.name === 'termStatus');

    termStatusColumn.should.have.property('formatValue').that.is.a('function');

    termStatusColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.conceptTermStatuses.value1');
  });
});
