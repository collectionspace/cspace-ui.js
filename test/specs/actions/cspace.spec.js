import chai from 'chai';

import getSession, {
  CSPACE_CONFIGURED,
  configureCSpace,
  createSession,
} from '../../../src/actions/cspace';

chai.should();

describe('cspace action creator', function suite() {
  describe('configureCSpace', function actionSuite() {
    it('should create a CSpace session as a side effect', function test() {
      const cspaceConfig = {
        foo: 'bar',
      };

      configureCSpace(cspaceConfig);

      const session = getSession();

      session.should.be.an('object');
      session.config().should.have.property('foo', 'bar');
    });

    it('should create a CSPACE_CONFIGURED action', function test() {
      const cspaceConfig = {
        foo: 'bar',
      };

      configureCSpace(cspaceConfig).should
        .include({ type: CSPACE_CONFIGURED })
        .and.have.property('payload')
          .that.has.property('foo', 'bar');
    });
  });

  describe('createSession', function actionSuite() {
    it('should create a CSpace session as a side effect', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      createSession(username, password);

      const session = getSession();

      session.should.be.an('object');
      session.config().should.have.property('foo', 'bar');
      session.config().should.have.property('username', username);
    });

    it('should create a CSPACE_CONFIGURED action', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      createSession(username, password).should
        .include({ type: CSPACE_CONFIGURED })
        .and.have.property('payload')
          .that.has.property('username', username);
    });
  });
});
