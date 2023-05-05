import React from 'react';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import ConfigPage from '../../../../src/components/pages/ConfigPage';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';

chai.should();

describe('ConfigPage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a link to a blob', function test() {
    const config = {};

    render(
      <ConfigProvider config={config}>
        <ConfigPage />
      </ConfigProvider>, this.container,
    );

    this.container.querySelector('a[href^="blob:"]').should.not.equal(null);
  });

  it('should revoke the blob url when unmounted', function test() {
    const config = {};

    render(
      <ConfigProvider config={config}>
        <ConfigPage />
      </ConfigProvider>, this.container,
    );

    render(<div />, this.container);

    // FIXME: How to check that the url has been revoked?
  });
});
