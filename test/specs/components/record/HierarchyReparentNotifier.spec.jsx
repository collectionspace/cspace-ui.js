import React from 'react';
import { render } from 'react-dom';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import HierarchyReparentNotifier from '../../../../src/components/record/HierarchyReparentNotifier';

const expect = chai.expect;

chai.should();

describe('HierarchyReparentNotifier', function suite() {
  const config = {
    recordTypes: {
      place: {
        name: 'place',
        serviceConfig: {
          servicePath: 'placeauthorities',
        },
        vocabularies: {
          local: {
            name: 'local',
            serviceConfig: {
              servicePath: 'urn:cspace:name(place)',
            },
          },
          tgn: {
            name: 'tgn',
            serviceConfig: {
              servicePath: 'urn:cspace:name(tgn_place)',
            },
          },
        },
      },
    },
  };

  const csid = '1234';

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing', function test() {
    const childData = Immutable.Map();
    const readRecord = () => {};
    const removeNotification = () => {};
    const showNotification = () => {};

    render(
      <HierarchyReparentNotifier
        config={config}
        csid={csid}
        childData={childData}
        readRecord={readRecord}
        removeNotification={removeNotification}
        showNotification={showNotification}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  context('when mounted', function context() {
    it('should call readRecord for each non-blank refName in childData', function test() {
      const childData = Immutable.fromJS({
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'': {},
        'urn:cspace:core.collectionspace.org:placeauthorities:name(tgn_place):item:name(Berkeley)\'Berkeley\'': {},
        '': {},
      });

      const removeNotification = () => {};
      const showNotification = () => {};

      const readRecordCalls = [];

      const readRecord = (...args) => {
        readRecordCalls.push(args);
      };

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={childData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);

      readRecordCalls.should.have.lengthOf(2);

      readRecordCalls[0].should.deep.equal([
        config,
        config.recordTypes.place,
        config.recordTypes.place.vocabularies.local,
        'urn:cspace:name(Alameda)',
      ]);

      readRecordCalls[1].should.deep.equal([
        config,
        config.recordTypes.place,
        config.recordTypes.place.vocabularies.tgn,
        'urn:cspace:name(Berkeley)',
      ]);
    });

    it('should not call readRecord for children whose ref names do not map to known record types and vocabularies', function test() {
      const childData = Immutable.fromJS({
        'urn:cspace:core.collectionspace.org:badauthorities:name(place):item:name(Alameda)\'Alameda\'': {},
        'urn:cspace:core.collectionspace.org:placeauthorities:name(ohno):item:name(Berkeley)\'Berkeley\'': {},
        '': {},
      });

      const removeNotification = () => {};
      const showNotification = () => {};

      const readRecordCalls = [];

      const readRecord = (...args) => {
        readRecordCalls.push(args);
      };

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={childData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);

      readRecordCalls.should.have.lengthOf(0);
    });

    it('should call showNotification with an item for each child that is being reparented', function test() {
      const childData = Immutable.fromJS({
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'': {
          document: {
            'rel:relations-common-list': {
              'relation-list-item': {
                predicate: 'hasBroader',
                subject: {
                  refName: 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'',
                },
                object: {
                  csid: '8888',
                  refName: 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(CA)\'California\'',
                },
              },
            },
          },
        },
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Berkeley)\'Berkeley\'': {
          document: {
            'rel:relations-common-list': {
              'relation-list-item': {
                predicate: 'hasBroader',
                subject: {
                  refName: 'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Berkeley)\'Berkeley\'',
                },
                object: {
                  csid,
                },
              },
            },
          },
        },
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Oakland)\'Oakland\'': {},
        '': {},
      });

      const readRecord = () => {};
      const removeNotification = () => {};

      let notificationItems = null;

      const showNotification = ({ items }) => {
        notificationItems = items;
      };

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={childData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);


      notificationItems.should.have.lengthOf(1);

      notificationItems[0].should.have.property('values').that.contains({
        childName: 'Alameda',
        parentName: 'California',
      });
    });
  });

  context('when props are updated', function context() {
    it('should call readRecord for each new non-blank refName in childData', function test() {
      const childData = Immutable.fromJS({
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'': {},
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Berkeley)\'Berkeley\'': {},
      });

      const removeNotification = () => {};
      const showNotification = () => {};

      const readRecordCalls = [];

      const readRecord = (...args) => {
        readRecordCalls.push(args);
      };

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={childData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);

      readRecordCalls.splice(0);

      const newChildData = Immutable.fromJS({
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(SF)\'San Francisco\'': {},
        '': {},
      });

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={newChildData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);

      readRecordCalls.should.have.lengthOf(1);

      readRecordCalls[0].should.deep.equal([
        config,
        config.recordTypes.place,
        config.recordTypes.place.vocabularies.local,
        'urn:cspace:name(SF)',
      ]);
    });

    it('should call removeNotification if no items are being reparented', function test() {
      const childData = Immutable.fromJS({
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'': {},
        'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Berkeley)\'Berkeley\'': {},
      });

      const readRecord = () => {};
      const showNotification = () => {};

      let removeNotificationCalled = false;

      const removeNotification = () => {
        removeNotificationCalled = true;
      };

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={childData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);

      const newChildData = Immutable.Map();

      render(
        <HierarchyReparentNotifier
          config={config}
          csid={csid}
          childData={newChildData}
          readRecord={readRecord}
          removeNotification={removeNotification}
          showNotification={showNotification}
        />, this.container);

      removeNotificationCalled.should.equal(true);
    });
  });
});
