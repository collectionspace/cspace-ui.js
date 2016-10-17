import React from 'react';
import { Simulate } from 'react-addons-test-utils';
import { render } from 'react-dom';
import chai from 'chai';

import createTestContainer from '../../../helpers/createTestContainer';

import Panel from '../../../../src/components/layout/Panel';

const expect = chai.expect;

chai.should();

const expectedClassName = 'cspace-ui-Panel--normal cspace-ui-Panel--common';

describe('Panel', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a section', function test() {
    render(<Panel />, this.container);

    this.container.firstElementChild.nodeName.should.equal('SECTION');
  });

  it('should render with correct class', function test() {
    render(<Panel />, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should render the supplied header', function test() {
    const headerText = 'This is the header';

    render(<Panel header={headerText} />, this.container);

    this.container.querySelector('header').textContent.should.equal(headerText);
  });

  it('should render the content', function test() {
    render(
      <Panel>
        <div id="content">This is some content</div>
      </Panel>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should hide content when collapsible and collapsed', function test() {
    render(
      <Panel collapsible collapsed>
        <div id="content">This is some content</div>
      </Panel>, this.container);

    expect(this.container.querySelector('div > div#content')).to.equal(null);
  });

  it('should ignore collapsed when not collapsible', function test() {
    render(
      <Panel collapsed>
        <div id="content">This is some content</div>
      </Panel>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should default to not collapsed when collapsible', function test() {
    render(
      <Panel collapsible>
        <div id="content">This is some content</div>
      </Panel>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });

  it('should call onToggleCollapsed when the header is clicked', function test() {
    const panelName = 'descPanel';

    let handlerCalledName = null;
    let handlerCalledIsCollapsed = null;

    const handleToggleCollapsed = (name, isCollapsed) => {
      handlerCalledName = name;
      handlerCalledIsCollapsed = isCollapsed;
    };

    render(
      <Panel
        name={panelName}
        header="Header"
        collapsible
        onToggleCollapsed={handleToggleCollapsed}
      >
        <div id="content">This is some content</div>
      </Panel>, this.container);

    const headerButton = this.container.querySelector('header > button');

    Simulate.click(headerButton);

    handlerCalledName.should.equal(panelName);
    handlerCalledIsCollapsed.should.equal(true);
  });

  it('should not call onToggleCollapsed if not collapsible', function test() {
    const panelName = 'descPanel';

    let handlerCalledName = null;
    let handlerCalledIsCollapsed = null;

    const handleToggleCollapsed = (name, isCollapsed) => {
      handlerCalledName = name;
      handlerCalledIsCollapsed = isCollapsed;
    };

    render(
      <Panel
        name={panelName}
        header="Header"
        collapsible={false}
        onToggleCollapsed={handleToggleCollapsed}
      >
        <div id="content">This is some content</div>
      </Panel>, this.container);

    const headerButton = this.container.querySelector('header > button');

    Simulate.click(headerButton);

    expect(handlerCalledName).to.equal(null);
    expect(handlerCalledIsCollapsed).to.equal(null);
  });
});
