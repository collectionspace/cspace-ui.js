import {
  serviceUriToLocation,
} from '../../../src/helpers/uriHelpers';

const { expect } = chai;

chai.should();

describe('uriHelpers', () => {
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

  describe('serviceUriToLocation', () => {
    it('should translate an object/procedure URL to a UI location', () => {
      serviceUriToLocation(config, '/groups/1eeb8c24-f553-403d-918b').should
        .deep.equal({
          pathname: '/record/group/1eeb8c24-f553-403d-918b',
        });
    });

    it('should translate an authority URL to a UI location', () => {
      serviceUriToLocation(config, '/personauthorities/urn:cspace:name(person)/items/29acc41a-e130-435e-98bc').should
        .deep.equal({
          pathname: '/record/person/local/29acc41a-e130-435e-98bc',
        });
    });

    it('should return undefined if no URI is supplied', () => {
      expect(serviceUriToLocation(config)).to.equal(undefined);
    });

    it('should return undefined if the URI is not a URL from the  REST API', () => {
      expect(serviceUriToLocation(config, 'http://some/weird/url')).to.equal(undefined);
    });

    it('should return undefined if the record service path is unknown', () => {
      expect(serviceUriToLocation(config, '/things/1eeb8c24-f553-403d-918b')).to.equal(undefined);
    });

    it('should return undefined if the vocabulary service path is unknown', () => {
      expect(serviceUriToLocation(config, '/personauthorities/urn:cspace:name(ohno)/items/29acc41a-e130-435e-98bc')).to.equal(undefined);
    });
  });
});
