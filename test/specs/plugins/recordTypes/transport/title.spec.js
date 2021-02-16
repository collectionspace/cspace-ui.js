import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/transport/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('transport record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the reference number and transporter', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:transports_common': {
          transportReferenceNumber: 'TR.2017.2',
          transporter: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(A Transporter1480570017652)\'A Transporter\'',
        },
      },
    });

    title(data).should.equal('TR.2017.2 – A Transporter');
  });

  it('should return the reference number when the transporter is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:transports_common': {
          transportReferenceNumber: 'TR.2017.2',
          transporter: '',
        },
      },
    });

    title(data).should.equal('TR.2017.2');
  });

  it('should return the title when the reference number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:transports_common': {
          transportReferenceNumber: '',
          transporter: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(A Transporter1480570017652)\'A Transporter\'',
        },
      },
    });

    title(data).should.equal('A Transporter');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:transports_extension': {
          transportReferenceNumber: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
