import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import mockHistory from '../../../helpers/mockHistory';
import LoginPage from '../../../../src/components/pages/LoginPage';

chai.should();

const history = mockHistory();

describe('LoginPage', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <LoginPage
            history={history}
            location={{}}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });
});
