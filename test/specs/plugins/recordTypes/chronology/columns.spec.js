import chronologyRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/chronology';
import createColumns from '../../../../../src/plugins/recordTypes/chronology/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('chronology record columns', () => {
  const chronologyRecordTypePlugin = chronologyRecordTypePluginFactory({});
  const configContext = createConfigContext(chronologyRecordTypePlugin);
  const columns = createColumns(configContext);
  const intl = {
    formatMessage: (message) => `formatted ${message.id}`,
  };

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });

  it('should have a vocabulary column that is formatted as a vocabulary name', () => {
    const config = chronologyRecordTypePlugin(configContext);
    const vocabCol = columns.default.vocabulary;

    vocabCol.should.have.property('formatValue').that.is.a('function');

    const refName = 'urn:cspace:core.collectionspace.org:chronologyauthorities:name(era):item:name(Chronology123)\'Chronology\'';

    vocabCol.formatValue(refName, { intl, config }).should
      .equal('formatted vocab.chronology.era.name');
  });
});
