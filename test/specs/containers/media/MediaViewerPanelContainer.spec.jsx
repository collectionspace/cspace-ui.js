import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
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

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerPanelContainer
        store={store}
        name={searchName}
        searchDescriptor={searchDescriptor}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const panel = findWithType(result, MediaViewerPanel);

    panel.props.should.have.property('searchResult', searchResult);
    panel.props.should.have.property('search').that.is.a('function');
  });
});
