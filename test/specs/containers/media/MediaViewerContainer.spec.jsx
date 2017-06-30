import React from 'react';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import MediaViewer from '../../../../src/components/media/MediaViewer';
import MediaViewerContainer from '../../../../src/containers/media/MediaViewerContainer';

import {
  searchKey,
} from '../../../../src/reducers/search';

chai.should();

const mockStore = configureMockStore();

describe('MediaViewerContainer', function suite() {
  it('should set props on MediaViewer', function test() {
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
    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewerContainer
        config={config}
        searchName={searchName}
        searchDescriptor={searchDescriptor}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(MediaViewer);
    result.props.should.have.property('isSearchPending', isPending);
    result.props.should.have.property('searchResult', searchResult);
    result.props.should.have.property('searchError', searchError);
  });
});
