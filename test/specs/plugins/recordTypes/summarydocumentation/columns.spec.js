import summaryDocumentationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/summarydocumentation';
import createColumns from '../../../../../src/plugins/recordTypes/summarydocumentation/columns';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('summarydocumentation record columns', () => {
  const summaryDocumentationRecordTypePlugin = summaryDocumentationRecordTypePluginFactory({});
  const configContext = createConfigContext(summaryDocumentationRecordTypePlugin);
  const columns = createColumns(configContext);

  it('should have the correct shape', () => {
    columns.should.have.property('default').that.is.an('object');
  });
});
