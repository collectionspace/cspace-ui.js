import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/group/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('group record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the title and owner', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:groups_common': {
          title: 'Group 1',
          owner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
        },
      },
    });

    title(data).should.equal('Group 1 – David Bowie');
  });

  it('should return the title when owner is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:groups_common': {
          title: 'Group 1',
          owner: '',
        },
      },
    });

    title(data).should.equal('Group 1');
  });

  it('should return the owner when title is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:groups_common': {
          title: '',
          owner: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(DavidBowie1480570017652)\'David Bowie\'',
        },
      },
    });

    title(data).should.equal('David Bowie');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:groups_extension': {
          title: 'Something',
        },
      },
    });

    title(data).should.equal('');
  });
});
