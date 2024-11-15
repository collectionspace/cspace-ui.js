import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/exit/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('exit record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the exit number and the owner', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:exits_common': {
          exitNumber: 'EX2024.1',
          owners: {
            owner: [
              'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Owner)\'Owner\'',
            ],
          },
        },
      },
    });

    title(data).should.equal('EX2024.1 – Owner');
  });

  it('should return the exit number when the owner is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:exits_common': {
          exitNumber: 'EX2024.1',
          owners: {
            owner: [],
          },
        },
      },
    });

    title(data).should.equal('EX2024.1');
  });

  it('should return the owner when the exit number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:exits_common': {
          exitNumber: '',
          owners: {
            owner: ['urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Owner)\'Owner\''],
          },
        },
      },
    });

    title(data).should.equal('Owner');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      data: {
        'ns2:exits_extension': {
          exitNumber: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
