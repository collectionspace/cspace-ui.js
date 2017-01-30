import columns from '../../../../../src/plugins/subresources/terms/columns';

chai.should();

describe('terms subresource columns', function suite() {
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
      object: {
        messages: {
          field: {
            objectProductionPerson: {
              id: 'field.object.objectProductionPerson',
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
    formatMessage: message => `formatted ${message.id}`,
  };

  it('should have correct shape', function test() {
    columns.should.have.property('default').that.is.an('array');
    columns.should.have.property('narrow').that.is.an('array');
  });

  describe('default column set', function setTest() {
    it('should have type column that is formatted as a record type name from a service path in a ref name', function test() {
      const typeColumn = columns.default.find(column => column.name === 'type');

      typeColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      typeColumn.formatValue(refName, { intl, config }).should
        .equal('formatted record.person.name');
    });

    it('should format the type column with a fallback if no record type is found with the service path', function test() {
      const typeColumn = columns.default.find(column => column.name === 'type');
      const refName = 'urn:cspace:core.collectionspace.org:foo:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      typeColumn.formatValue(refName, { intl, config }).should
        .equal('[ foo ]');
    });

    it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
      const vocabularyColumn = columns.default.find(column => column.name === 'vocabulary');

      vocabularyColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('formatted vocab.person.local.name');
    });

    it('should format the vocabulary column with a fallback if no record type is found with the service path', function test() {
      const vocabularyColumn = columns.default.find(column => column.name === 'vocabulary');
      const refName = 'urn:cspace:core.collectionspace.org:foo:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('[ foo ]');
    });

    it('should format the vocabulary column with a fallback if no vocabulary is found with the short id', function test() {
      const vocabularyColumn = columns.default.find(column => column.name === 'vocabulary');
      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(bar):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('[ bar ]');
    });

    it('should have sourceField column that is formatted as a field name from a part and field ids', function test() {
      const sourceFieldColumn = columns.default.find(column => column.name === 'sourceField');

      sourceFieldColumn.should.have.property('formatValue').that.is.a('function');

      const sourceField = 'collectionobjects_common:objectProductionPerson';

      sourceFieldColumn.formatValue(sourceField, { intl, config, recordType: 'object' }).should
        .equal('formatted field.object.objectProductionPerson');
    });
  });

  it('should format the sourceField column with a fallback if no field is found with the id', function test() {
    const sourceFieldColumn = columns.default.find(column => column.name === 'sourceField');
    const sourceField = 'collectionobjects_common:foobar';

    sourceFieldColumn.formatValue(sourceField, { intl, config, recordType: 'object' }).should
      .equal('[ foobar ]');
  });

  describe('narrow column set', function setTest() {
    it('should have type column that is formatted as a record type name from a service path in a ref name', function test() {
      const typeColumn = columns.narrow.find(column => column.name === 'type');

      typeColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      typeColumn.formatValue(refName, { intl, config }).should
        .equal('formatted record.person.name');
    });

    it('should have vocabulary column that is formatted as a vocabulary name from a short id in a ref name', function test() {
      const vocabularyColumn = columns.narrow.find(column => column.name === 'vocabulary');

      vocabularyColumn.should.have.property('formatValue').that.is.a('function');

      const refName = 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(JaneDoe1484001439799)\'Jane Doe\'';

      vocabularyColumn.formatValue(refName, { intl, config }).should
        .equal('formatted vocab.person.local.name');
    });

    it('should have sourceField column that is formatted as a field name from a part and field ids', function test() {
      const sourceFieldColumn = columns.narrow.find(column => column.name === 'sourceField');

      sourceFieldColumn.should.have.property('formatValue').that.is.a('function');

      const sourceField = 'collectionobjects_common:objectProductionPerson';

      sourceFieldColumn.formatValue(sourceField, { intl, config, recordType: 'object' }).should
        .equal('formatted field.object.objectProductionPerson');
    });
  });
});
