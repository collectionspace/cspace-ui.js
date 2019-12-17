import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/conservation/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('conservation record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the conservation number and the status', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:conservation_common': {
          conservationNumber: 'CT2017.1',
          conservationStatusGroupList: {
            conservationStatusGroup: [{
              status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
            }, {
              status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
            }],
          },
        },
      },
    });

    title(data).should.equal('CT2017.1 – Treatment approved');
  });

  it('should return the conservation number when the status is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:conservation_common': {
          conservationNumber: 'CT2017.1',
          conservationStatusGroupList: {
            conservationStatusGroup: [],
          },
        },
      },
    });

    title(data).should.equal('CT2017.1');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:conservation_extension': {
          conservationNumber: 'CT2017.1',
          conservationStatusGroupList: {
            conservationStatusGroup: [{
              status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
            }, {
              status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
            }],
          },
        },
      },
    });

    title(data).should.equal('');
  });
});
