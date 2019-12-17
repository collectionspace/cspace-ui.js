import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Redirect, Route } from 'react-router';
import AdminPage from '../../../../src/components/pages/AdminPage';
import ProtectedPage from '../../../../src/components/pages/ProtectedPage';
import ProtectedRoute from '../../../../src/components/routes/ProtectedRoute';

chai.should();

describe('ProtectedRoute', () => {
  it('should render a route to a Redirect if no username is supplied', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ProtectedRoute />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Route);
    result.props.should.have.property('render').that.is.a('function');

    const routeRendering = result.props.render({});

    routeRendering.type.should.equal(Redirect);
  });

  it('should render a route to a ProtectedPage if a username is supplied', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ProtectedRoute
        component={AdminPage}
        username="admin@core.collectionspace.org"
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Route);
    result.props.should.have.property('render').that.is.a('function');

    const routeRendering = result.props.render({});

    routeRendering.type.should.equal(ProtectedPage);
  });
});
