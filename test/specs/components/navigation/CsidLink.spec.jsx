import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import SearchResultLinkContainer from '../../../../src/containers/search/SearchResultLinkContainer';
import CsidLink from '../../../../src/components/navigation/CsidLink';

chai.should();

describe('CsidLink', () => {
  it('should render as a SearchResultLink', () => {
    const config = {};
    const csid = '1234';
    const searchName = 'test';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<CsidLink config={config} csid={csid} searchName={searchName} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchResultLinkContainer);
    result.props.should.have.property('config', config);
    result.props.should.have.property('searchName', searchName);

    result.props.searchDescriptor.getIn(['searchQuery', 'csid']).should.equal(csid);
  });
});
