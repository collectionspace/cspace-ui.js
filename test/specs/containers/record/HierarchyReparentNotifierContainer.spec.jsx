import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import thunk from 'redux-thunk';
import HierarchyReparentNotifier from '../../../../src/components/record/HierarchyReparentNotifier';
import HierarchyReparentNotifierContainer from '../../../../src/containers/record/HierarchyReparentNotifierContainer';
import { findWithType } from 'react-shallow-testutils';

chai.use(chaiImmutable);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('HierarchyReparentNotifierContainer', () => {
  it('should set props on HierarchyReparentNotifier', () => {
    const csid = '1234';

    const childRefNames = Immutable.List([
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'',
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Berkeley)\'Berkeley\'',
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Oakland)\'Oakland\'',
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(SF)\'San Francisco\'',
    ]);

    const config = {};

    const store = mockStore({
      record: Immutable.fromJS({
        'urn:cspace:name(Alameda)': {
          data: {
            current: 'Alameda data',
          },
        },
        'urn:cspace:name(Berkeley)': {
          data: {
            current: 'Berkeley data',
          },
        },
        'urn:cspace:name(Oakland)': {
          data: {
            current: 'Oakland data',
          },
        },
        'urn:cspace:name(SF)': {
          data: {
            current: 'SF data',
          },
        },
      }),
    });

    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchyReparentNotifierContainer
        store={store}
        config={config}
        csid={csid}
        childRefNames={childRefNames}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const notifier = findWithType(result, HierarchyReparentNotifier);

    notifier.should.not.be.null;

    notifier.props.should.have.property('childData').that.equals(Immutable.Map({
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Alameda)\'Alameda\'': 'Alameda data',
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Berkeley)\'Berkeley\'': 'Berkeley data',
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(Oakland)\'Oakland\'': 'Oakland data',
      'urn:cspace:core.collectionspace.org:placeauthorities:name(place):item:name(SF)\'San Francisco\'': 'SF data',
    }));

    notifier.props.should.have.property('readRecord').that.is.a('function');
    notifier.props.should.have.property('removeNotification').that.is.a('function');
    notifier.props.should.have.property('showNotification').that.is.a('function');
  });
});
