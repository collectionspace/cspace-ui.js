import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/collectionobject/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('collectionobject record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the object number and primary title', function test() {
    const cspaceDocument = Immutable.fromJS({
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
    });

    title(cspaceDocument).should.equal('1-234 – Primary Title');
  });

  it('should return the object number when primary title is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
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
    });

    title(cspaceDocument).should.equal('1-234');
  });

  it('should return the primary title when object number is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
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
    });

    title(cspaceDocument).should.equal('Primary Title');
  });

  it('should work when titleGroupList is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:collectionobjects_common': {
        objectNumber: '1-234',
      },
    });

    title(cspaceDocument).should.equal('1-234');
  });

  it('should work when titleGroup is an object (not an array)', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:collectionobjects_common': {
        objectNumber: '1-234',
        titleGroupList: {
          titleGroup: {
            title: 'Primary Title',
          },
        },
      },
    });

    title(cspaceDocument).should.equal('1-234 – Primary Title');
  });

  it('should work when titleGroup is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:collectionobjects_common': {
        objectNumber: '1-234',
        titleGroupList: {},
      },
    });

    title(cspaceDocument).should.equal('1-234');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:collectionobjects_extension': {
        objectNumber: '1-234',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});
