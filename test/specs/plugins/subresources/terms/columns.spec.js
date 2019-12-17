import columns from '../../../../../src/plugins/subresources/terms/columns';
import { configKey } from '../../../../../src/helpers/configHelpers';

chai.should();

describe('terms subresource columns', () => {
  const config = {
    recordTypes: {
      person: {
        messages: {
          record: {
            name: {
              id: 'record.person.name',
            },
          },
        },
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
      collectionobject: {
        name: 'collectionobject',
        fields: {
          document: {
            'ns2:collectionobjects_common': {
              objectProductionPersonGroupList: {
                objectProductionPersonGroup: {
                  objectProductionPerson: {
                    [configKey]: {
                      messages: {
                        fullName: {
                          id: 'field.collectionobjects_common.objectProductionPerson.fullName',
                          defaultMessage: 'Production person',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        serviceConfig: {
          servicePath: 'collectionobjects',
        },
      },
    },
  };

  const intl = {
    formatMessage: (message) => `formatted ${message.id}`,
  };

  it('should have correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
    columns.should.have.property('narrow').that.is.an('object');
  });

  describe('default column set', () => {
    it('should have type column that is formatted as a record type name from a service path in a ref name', () => {
      const typeColumn = columns.default.type;

      typeColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      typeColumn.formatValue(refName, { intl, config }).should
        .equal('formatted record.person.name');
    });

    it('should format the type column with a fallback if no record type is found with the service path', () => {
      const typeColumn = columns.default.type;
      const refName = 'urn:cspace:core.collectionspace.org:foo:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      typeColumn.formatValue(refName, { intl, config }).should
        .equal('[ foo ]');
    });

    it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', () => {
      const vocabularyColumn = columns.default.vocabulary;

      vocabularyColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('formatted vocab.person.local.name');
    });

    it('should format the vocabulary column with a fallback if no record type is found with the service path', () => {
      const vocabularyColumn = columns.default.vocabulary;
      const refName = 'urn:cspace:core.collectionspace.org:foo:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('[ foo ]');
    });

    it('should format the vocabulary column with a fallback if no vocabulary is found with the short id', () => {
      const vocabularyColumn = columns.default.vocabulary;
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(bar):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('[ bar ]');
    });

    it('should have sourceField column that is formatted as a field name from a part and field ids', () => {
      const sourceFieldColumn = columns.default.sourceField;

      sourceFieldColumn.should.have.property('formatValue').that.is.a('function');

      const sourceField = 'collectionobjects_common:objectProductionPerson';

      sourceFieldColumn.formatValue(sourceField, { intl, config, recordType: 'collectionobject' }).should
        .equal('formatted field.collectionobjects_common.objectProductionPerson.fullName');
    });
  });

  it('should format the sourceField column with a fallback if no field is found with the id', () => {
    const sourceFieldColumn = columns.default.sourceField;
    const sourceField = 'collectionobjects_common:foobar';

    sourceFieldColumn.formatValue(sourceField, { intl, config, recordType: 'object' }).should
      .equal('[ foobar ]');
  });

  describe('narrow column set', () => {
    it('should have type column that is formatted as a record type name from a service path in a ref name', () => {
      const typeColumn = columns.narrow.type;

      typeColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      typeColumn.formatValue(refName, { intl, config }).should
        .equal('formatted record.person.name');
    });

    it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', () => {
      const vocabularyColumn = columns.narrow.vocabulary;

      vocabularyColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('formatted vocab.person.local.name');
    });

    it('should have sourceField column that is formatted as a field name from a part and field ids', () => {
      const sourceFieldColumn = columns.narrow.sourceField;

      sourceFieldColumn.should.have.property('formatValue').that.is.a('function');

      const sourceField = 'collectionobjects_common:objectProductionPerson';

      sourceFieldColumn.formatValue(sourceField, { intl, config, recordType: 'collectionobject' }).should
        .equal('formatted field.collectionobjects_common.objectProductionPerson.fullName');
    });
  });
});
