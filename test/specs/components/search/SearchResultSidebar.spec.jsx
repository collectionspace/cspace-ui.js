import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import SearchResultSidebar from '../../../../src/components/search/SearchResultSidebar';

const { expect } = chai;

chai.should();

const config = {
  recordTypes: {
    group: {},
  },
};

describe('SearchResultSidebar', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchResultSidebar
        config={config}
        recordType="group"
        isOpen
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should render nothing if isOpen is false', function test() {
    render(
      <SearchResultSidebar
        config={config}
        recordType="group"
        isOpen={false}
      />, this.container,
    );

    expect(this.container.firstElementChild).to.equal(null);
  });
});
