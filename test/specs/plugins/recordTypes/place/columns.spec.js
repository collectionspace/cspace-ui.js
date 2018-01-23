import createColumns from '../../../../../src/plugins/recordTypes/place/columns';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('place record columns', function suite() {
  const pluginContext = createPluginContext();
  const columns = createColumns(pluginContext);

  const config = {
    optionLists: {
      placeTermStatuses: {
        messages: {
          value1: {
            id: 'option.placeTermStatuses.value1',
            defaultMessage: 'Value 1',
          },
        },
      },
    },
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
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
    const vocabularyColumn = columns.default.vocabulary;

    vocabularyColumn.should.have.property('formatValue').that.is.a('function');

    const refName = 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(LakeTahoe1484001439799)\'Lake Tahoe\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.place.local.name');
  });

  it('should have term status column that is formatted as an option list value', function test() {
    const termStatusColumn = columns.default.termStatus;

    termStatusColumn.should.have.property('formatValue').that.is.a('function');

    termStatusColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.placeTermStatuses.value1');
  });
});
