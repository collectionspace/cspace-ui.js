import collectionobjectRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/collectionobject';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('collectionobject record plugin', () => {
  const config = {};
  const collectionobjectRecordTypePlugin = collectionobjectRecordTypePluginFactory(config);
  const configContext = createConfigContext();

  it('should have the correct shape', () => {
    const pluginConfigContribution = collectionobjectRecordTypePlugin(configContext);

    const {
      optionLists,
      recordTypes,
    } = pluginConfigContribution;

    optionLists.should.be.an('object');
    recordTypes.should.have.property('collectionobject');

    const collectionobjectRecordType = recordTypes.collectionobject;

    collectionobjectRecordType.should.have.property('messages').that.is.an('object');
    collectionobjectRecordType.should.have.property('serviceConfig').that.is.an('object');
    collectionobjectRecordType.should.have.property('title').that.is.a('function');
    collectionobjectRecordType.should.have.property('forms').that.is.an('object');
  });
});
