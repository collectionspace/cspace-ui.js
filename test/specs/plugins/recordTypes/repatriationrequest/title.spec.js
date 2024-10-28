import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/repatriationrequest/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('repatriationrequest record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should return the request number and title when both are present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:repatriationrequests_common': {
          requestNumber: 'NCL',
          title: 'Title',
        },
      },
    });

    title(data).should.equal('NCL – Title');
  });

  it('should return the request number only when the title is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:repatriationrequests_common': {
          requestNumber: 'NCL',
        },
      },
    });

    title(data).should.equal('NCL');
  });

  it('should return the title only when the request number is missing', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:repatriationrequests_common': {
          title: 'Title',
        },
      },
    });

    title(data).should.equal('Title');
  });

  it('should return an empty string if no document is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return an empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:repatriationrequests_extension': {
          repatriationrequestAltTitle: 'Alt request title',
        },
      },
    });

    title(data).should.equal('');
  });
});
