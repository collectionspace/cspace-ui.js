import createColumns from '../../../../../src/plugins/recordTypes/location/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('location record columns', function suite() {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  const config = {
    optionLists: {
      locationTermStatuses: {
        messages: {
          value1: {
            id: 'option.locationTermStatuses.value1',
            defaultMessage: 'Value 1',
          },
        },
      },
    },
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
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
    const vocabularyColumn = columns.default.vocabulary;

    vocabularyColumn.should.have.property('formatValue').that.is.a('function');

    const refName = 'urn:cspace:core.collectionspace.org:locationauthorities:name(location):item:name(BackRoom1484001439799)\'Back Room\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.location.local.name');
  });

  it('should have term status column that is formatted as an option list value', function test() {
    const termStatusColumn = columns.default.termStatus;

    termStatusColumn.should.have.property('formatValue').that.is.a('function');

    termStatusColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.locationTermStatuses.value1');
  });
});
