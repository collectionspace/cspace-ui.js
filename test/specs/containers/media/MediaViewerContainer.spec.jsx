import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import findWithType from 'react-shallow-testutils/lib/find-with-type';
import MediaViewer from '../../../../src/components/media/MediaViewer';
import MediaViewerContainer from '../../../../src/containers/media/MediaViewerContainer';

import {
  searchKey,
} from '../../../../src/reducers/search';

chai.should();

const mockStore = configureMockStore();

describe('MediaViewerContainer', () => {
  it('should set props on MediaViewer', () => {
    const searchName = 'test';
    const searchDescriptor = Immutable.Map();
    const key = searchKey(searchDescriptor);

    const isPending = true;
    const searchResult = Immutable.Map();
    const searchError = Immutable.Map();

    const store = mockStore({
      search: Immutable.fromJS({
        [searchName]: {
          byKey: {
            [key]: {
              isPending,
              result: searchResult,
              error: searchError,
            },
          },
        },
      }),
    });

    const config = {};
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerContainer
        store={store}
        config={config}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const viewer = findWithType(result, MediaViewer);

    viewer.props.should.have.property('isSearchPending', isPending);
    viewer.props.should.have.property('searchResult', searchResult);
    viewer.props.should.have.property('searchError', searchError);
  });
});
