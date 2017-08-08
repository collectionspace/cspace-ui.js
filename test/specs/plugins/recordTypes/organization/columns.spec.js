import columns from '../../../../../src/plugins/recordTypes/organization/columns';

chai.should();

describe('organization record columns', function suite() {
  const config = {
    recordTypes: {
      organization: {
        serviceConfig: {
          servicePath: 'organizationauthorities',
        },
        vocabularies: {
          local: {
            messages: {
              name: {
                id: 'vocab.organization.local.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(organization)',
            },
          },
          ulan: {
            messages: {
              name: {
                id: 'vocab.organization.ulan.name',
              },
            },
            serviceConfig: {
              servicePath: 'urn:cspace:name(ulan_oa)',
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

    const refName = 'urn:cspace:core.collectionspace.org:organizationauthorities:name(organization):item:name(Lyrasis1484001439799)\'Lyrasis\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.organization.local.name');
  });
});
