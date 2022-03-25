import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/audit/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('audit record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the resourceCSID and date', () => {
    const data = Immutable.fromJS({
      'ns3:audit_common': {
        resourceCSID: '1234',
        eventDate: 'Date',
      },
    });

    title(data).should.equal('1234 – Date');
  });

  it('should return the resourceCSID when the date is empty', () => {
    const data = Immutable.fromJS({
      'ns3:audit_common': {
        resourceCSID: '1234',
      },
    });

    title(data).should.equal('1234');
  });

  it('should return the date when the csid is empty', () => {
    const data = Immutable.fromJS({
      'ns3:audit_common': {
        eventDate: 'Date',
      },
    });

    title(data).should.equal('Date');
  });

  it('should return an empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });
});
