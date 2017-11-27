import {
  serviceUriToLocation,
} from '../../../src/helpers/uriHelpers';

const expect = chai.expect;

chai.should();

describe('uriHelpers', function moduleSuite() {
  const config = {
    recordTypes: {
      group: {
        name: 'group',
        serviceConfig: {
          servicePath: 'groups',
        },
      },
      person: {
        name: 'person',
        serviceConfig: {
          servicePath: 'personauthorities',
        },
        vocabularies: {
          local: {
            name: 'local',
            serviceConfig: {
              servicePath: 'urn:cspace:name(person)',
            },
          },
        },
      },
    },
  };

  describe('serviceUriToLocation', function suite() {
    it('should translate an object/procedure URL to a UI location', function test() {
      serviceUriToLocation(config, 'http://localhost/cspace-services/groups/1eeb8c24-f553-403d-918b').should
        .deep.equal({
          pathname: '/record/group/1eeb8c24-f553-403d-918b',
        });
    });

    it('should translate an authority URL to a UI location', function test() {
      serviceUriToLocation(config, 'http://localhost/cspace-services/personauthorities/urn:cspace:name(person)/items/29acc41a-e130-435e-98bc').should
        .deep.equal({
          pathname: '/record/person/local/29acc41a-e130-435e-98bc',
        });
    });

    it('should return undefined if no URI is supplied', function test() {
      expect(serviceUriToLocation(config)).to.equal(undefined);
    });

    it('should return undefined if the URI is not a URL from the  REST API', function test() {
      expect(serviceUriToLocation(config, 'http://some/weird/url')).to.equal(undefined);
    });

    it('should return undefined if the record service path is unknown', function test() {
      expect(serviceUriToLocation(config, 'http://localhost/cspace-services/things/1eeb8c24-f553-403d-918b')).to.equal(undefined);
    });

    it('should return undefined if the vocabulary service path is unknown', function test() {
      expect(serviceUriToLocation(config, 'http://localhost/cspace-services/personauthorities/urn:cspace:name(ohno)/items/29acc41a-e130-435e-98bc')).to.equal(undefined);
    });
  });
});
