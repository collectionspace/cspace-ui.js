import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import MediaViewerPanel from '../../../../src/components/media/MediaViewerPanel';
import MediaViewerPanelContainer from '../../../../src/containers/media/MediaViewerPanelContainer';

import {
  searchKey,
} from '../../../../src/reducers/search';

chai.should();

const mockStore = configureMockStore();

describe('MediaViewerPanelContainer', () => {
  it('should set props on MediaViewerPanel', () => {
    const searchName = 'test';
    const searchDescriptor = Immutable.Map();
    const key = searchKey(searchDescriptor);

    const searchResult = Immutable.Map();

    const store = mockStore({
      search: Immutable.fromJS({
        [searchName]: {
          byKey: {
            [key]: {
              result: searchResult,
            },
          },
        },
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerPanelContainer
        name={searchName}
        searchDescriptor={searchDescriptor}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(MediaViewerPanel);
    result.props.should.have.property('searchResult', searchResult);
    result.props.should.have.property('search').that.is.a('function');
  });
});
