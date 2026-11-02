/* global document */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Switch } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import RouteFocusManager from '../../../../src/components/routes/RouteFocusManager';

chai.should();

const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

const HeadingPage = ({ match }) => (
  <main tabIndex={-1}>
    <h1 tabIndex={-1}>{`${match.params.title || 'Heading'} page`}</h1>
    <button type="button" id="button">Button</button>
  </main>
);

HeadingPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

const NoHeadingPage = () => (
  <main tabIndex={-1}>
    <p>No heading</p>
  </main>
);

const NoTabIndexHeadingPage = () => (
  <main tabIndex={-1}>
    <h1>Plain heading</h1>
  </main>
);

const BusyPage = ({ busy }) => (
  <main tabIndex={-1}>
    <header aria-busy={busy ? 'true' : undefined}>
      <h1 tabIndex={-1}>{busy ? 'Loading' : 'Loaded'}</h1>
    </header>
  </main>
);

BusyPage.propTypes = {
  busy: PropTypes.bool,
};

class TestApp extends Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
  }

  render() {
    const {
      busy,
      initialPath,
      onHistory,
      timeout,
    } = this.props;

    return (
      <MemoryRouter initialEntries={[initialPath]}>
        <div ref={this.rootRef}>
          <Route
            render={({ history }) => {
              onHistory(history);

              return null;
            }}
          />

          <Switch>
            <Route path="/busy" render={() => <BusyPage busy={busy} />} />
            <Route path="/plain" component={NoTabIndexHeadingPage} />
            <Route path="/empty" component={NoHeadingPage} />
            <Route path="/record/:title" component={HeadingPage} />
            <Route path="/page" component={HeadingPage} />
          </Switch>

          <RouteFocusManager rootRef={this.rootRef} pollInterval={10} timeout={timeout} />
        </div>
      </MemoryRouter>
    );
  }
}

TestApp.propTypes = {
  busy: PropTypes.bool,
  initialPath: PropTypes.string,
  onHistory: PropTypes.func,
  timeout: PropTypes.number,
};

TestApp.defaultProps = {
  initialPath: '/page',
  onHistory: () => undefined,
  timeout: 5000,
};

describe('RouteFocusManager', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  afterEach(function after() {
    unmountComponentAtNode(this.container);
  });

  it('should focus the main heading when mounted', async function test() {
    render(<TestApp />, this.container);

    await wait(50);

    document.activeElement.should.equal(this.container.querySelector('h1'));
  });

  it('should focus the main heading of the new page when the pathname changes', async function test() {
    let history;

    render(<TestApp onHistory={(h) => { history = h; }} />, this.container);

    await wait(50);

    act(() => {
      history.push('/record/Foo');
    });

    await wait(50);

    const heading = this.container.querySelector('h1');

    heading.textContent.should.equal('Foo page');
    document.activeElement.should.equal(heading);
  });

  it('should focus the heading when its text changes on the same page component', async function test() {
    let history;

    render(<TestApp initialPath="/record/Foo" onHistory={(h) => { history = h; }} />, this.container);

    await wait(50);

    const heading = this.container.querySelector('h1');

    document.activeElement.should.equal(heading);

    this.container.querySelector('#button').focus();

    act(() => {
      history.push('/record/Bar');
    });

    await wait(50);

    this.container.querySelector('h1').should.equal(heading);
    heading.textContent.should.equal('Bar page');
    document.activeElement.should.equal(heading);
  });

  it('should not move focus when the pathname changes but the heading is unchanged', async function test() {
    let history;

    render(<TestApp initialPath="/page" onHistory={(h) => { history = h; }} />, this.container);

    await wait(50);

    const button = this.container.querySelector('#button');

    button.focus();

    act(() => {
      history.replace('/page/sub');
    });

    await wait(50);

    document.activeElement.should.equal(button);
  });

  it('should not move focus when only the query string or hash changes', async function test() {
    let history;

    render(<TestApp initialPath="/page" onHistory={(h) => { history = h; }} />, this.container);

    await wait(50);

    const button = this.container.querySelector('#button');

    button.focus();

    act(() => {
      history.push('/page?p=2');
    });

    await wait(50);

    document.activeElement.should.equal(button);

    act(() => {
      history.push('/page?p=2#frag');
    });

    await wait(50);

    document.activeElement.should.equal(button);
  });

  it('should wait until the heading is no longer busy before focusing it', async function test() {
    render(<TestApp initialPath="/busy" busy />, this.container);

    await wait(50);

    document.activeElement.should.not.equal(this.container.querySelector('h1'));

    render(<TestApp initialPath="/busy" busy={false} />, this.container);

    await wait(50);

    const heading = this.container.querySelector('h1');

    heading.textContent.should.equal('Loaded');
    document.activeElement.should.equal(heading);
  });

  it('should make a heading focusable if it is not already', async function test() {
    render(<TestApp initialPath="/plain" />, this.container);

    await wait(50);

    const heading = this.container.querySelector('h1');

    heading.getAttribute('tabindex').should.equal('-1');
    document.activeElement.should.equal(heading);
  });

  it('should focus the main landmark if no heading is found before the timeout', async function test() {
    render(<TestApp initialPath="/empty" timeout={50} />, this.container);

    await wait(20);

    document.activeElement.should.not.equal(this.container.querySelector('main'));

    await wait(100);

    document.activeElement.should.equal(this.container.querySelector('main'));
  });
});
