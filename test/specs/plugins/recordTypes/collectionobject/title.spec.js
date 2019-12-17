import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/collectionobject/title';
import createConfigContext from '../../../../../src/helpers/createConfigContext';

chai.should();

describe('collectionobject record title', () => {
  const configContext = createConfigContext();
  const title = createTitleGetter(configContext);

  it('should concat the object number and primary title', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1-234',
          titleGroupList: {
            titleGroup: [{
              title: 'Primary Title',
            }, {
              title: 'Alternate Title',
            }],
          },
        },
      },
    });

    title(data).should.equal('1-234 – Primary Title');
  });

  it('should return the object number when primary title is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1-234',
          titleGroupList: {
            titleGroup: [{
              title: '',
            }, {
              title: 'Alternate Title',
            }],
          },
        },
      },
    });

    title(data).should.equal('1-234');
  });

  it('should return the primary title when object number is empty', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '',
          titleGroupList: {
            titleGroup: [{
              title: 'Primary Title',
            }, {
              title: 'Alternate Title',
            }],
          },
        },
      },
    });

    title(data).should.equal('Primary Title');
  });

  it('should work when titleGroupList is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1-234',
        },
      },
    });

    title(data).should.equal('1-234');
  });

  it('should work when titleGroup is an object (not an array)', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1-234',
          titleGroupList: {
            titleGroup: {
              title: 'Primary Title',
            },
          },
        },
      },
    });

    title(data).should.equal('1-234 – Primary Title');
  });

  it('should work when titleGroup is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_common': {
          objectNumber: '1-234',
          titleGroupList: {},
        },
      },
    });

    title(data).should.equal('1-234');
  });

  it('should return empty string if no data is passed', () => {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', () => {
    const data = Immutable.fromJS({
      document: {
        'ns2:collectionobjects_extension': {
          objectNumber: '1-234',
        },
      },
    });

    title(data).should.equal('');
  });
});
