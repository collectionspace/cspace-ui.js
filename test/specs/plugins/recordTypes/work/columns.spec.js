import createColumns from '../../../../../src/plugins/recordTypes/work/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('work record columns', () => {
  const configContext = createConfigContext();
  const columns = createColumns(configContext);

  const config = {
    optionLists: {
      workTermStatuses: {
        messages: {
          value1: {
            id: 'option.workTermStatuses.value1',
            defaultMessage: 'Value 1',
          },
        },
      },
    },
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
    formatMessage: (message) => `formatted ${message.id}`,
  };

  it('should have correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', () => {
    const vocabularyColumn = columns.default.vocabulary;

    vocabularyColumn.should.have.property('formatValue').that.is.a('function');

    const refName = 'urn:cspace:core.collectionspace.org:workauthorities:name(work):item:name(Hamilton1484001439799)\'Hamilton\'';

    vocabularyColumn.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.work.local.name');
  });

  it('should have term status column that is formatted as an option list value', () => {
    const termStatusColumn = columns.default.termStatus;

    termStatusColumn.should.have.property('formatValue').that.is.a('function');

    termStatusColumn.formatValue('value1', { intl, config }).should
      .equal('formatted option.workTermStatuses.value1');
  });
});
