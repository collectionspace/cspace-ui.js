import dutyOfCareRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/dutyofcare';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('dutyofcare record plugin', () => {
  const config = {};
  const dutyOfCareRecordTypePlugin = dutyOfCareRecordTypePluginFactory(config);
  const configContext = createConfigContext(dutyOfCareRecordTypePlugin);

  it('should have the correct shape', () => {
    const pluginConfiguration = dutyOfCareRecordTypePlugin(configContext);

    const {
      recordTypes,
    } = pluginConfiguration;

    recordTypes.should.have.property('dutyofcare');

    const dutyOfCareRecordType = recordTypes.dutyofcare;

    dutyOfCareRecordType.should.have.property('title').that.is.a('function');
    dutyOfCareRecordType.should.have.property('forms').that.is.an('object');
    dutyOfCareRecordType.should.have.property('messages').that.is.an('object');
    dutyOfCareRecordType.should.have.property('serviceConfig').that.is.an('object');

    dutyOfCareRecordType.title().should.be.a('string');
  });
});
