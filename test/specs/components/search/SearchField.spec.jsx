import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import Field from '../../../../src/components/record/Field';
import SearchField from '../../../../src/components/search/SearchField';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('SearchField', function suite() {
  it('should render a Field', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Field);
  });

  it('should pass parentPath, name, and value props to the base Field', function test() {
    const parentPath = ['a', 'b'];
    const name = 'name';
    const value = 'value';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchField
        parentPath={parentPath}
        name={name}
        value={value}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.parentPath.should.equal(parentPath);
    result.props.name.should.equal(name);
    result.props.value.should.equal(value);
  });

  it('should override props on the base Field', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField />);

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.label).to.equal(undefined);
    result.props.repeating.should.equal(true);
    result.props.renderOrderIndicator.should.be.a('function');
    result.props.onAddInstance.should.be.a('function');
    result.props.onRemoveInstance.should.be.a('function');
    result.props.viewType.should.equal('search');
    result.props.showQuickAdd.should.equal(false);
    result.props.ignoreDisabledOptions.should.equal(true);
  });

  it('should append a null item and commit the new value when a repeating field instance is added', function test() {
    const value = Immutable.List(['a', 'b', 'c']);

    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField value={value} onCommit={handleCommit} />);

    const result = shallowRenderer.getRenderOutput();
    const { onAddInstance } = result.props;

    onAddInstance(['fieldName']);

    committedPath.should.deep.equal(['fieldName']);
    committedValue.should.equal(Immutable.List(['a', 'b', 'c', null]));
  });

  it('should convert a scalar value to a list when a repeating field instance is committed', function test() {
    const value = 'a';

    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField value={value} onCommit={handleCommit} />);

    const result = shallowRenderer.getRenderOutput();
    const { onCommit } = result.props;

    onCommit(['fieldName', 1], 'b');

    committedPath.should.deep.equal(['fieldName']);
    committedValue.should.equal(Immutable.List(['a', 'b']));
  });

  it('should set the item and commit the value when a repeating field instance is committed', function test() {
    const value = Immutable.List(['a', 'b', 'c']);

    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField value={value} onCommit={handleCommit} />);

    const result = shallowRenderer.getRenderOutput();
    const { onCommit } = result.props;

    onCommit(['fieldName', 1], 'd');

    committedPath.should.deep.equal(['fieldName']);
    committedValue.should.equal(Immutable.List(['a', 'd', 'c']));
  });

  it('should convert a scalar value to a list when a repeating field instance is added', function test() {
    const value = 'a';

    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField value={value} onCommit={handleCommit} />);

    const result = shallowRenderer.getRenderOutput();
    const { onAddInstance } = result.props;

    onAddInstance(['fieldName']);

    committedPath.should.deep.equal(['fieldName']);
    committedValue.should.equal(Immutable.List(['a', null]));
  });

  it('should call onCommit when the field is committed and repeating is false', function test() {
    const value = 'a';

    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField repeating={false} value={value} onCommit={handleCommit} />);

    const result = shallowRenderer.getRenderOutput();
    const { onCommit } = result.props;

    onCommit(['fieldName'], 'd');

    committedPath.should.deep.equal(['fieldName']);
    committedValue.should.equal('d');
  });

  it('should delete the item and commit the new value when a repeating field instance is removed', function test() {
    const value = Immutable.List(['a', 'b', 'c']);

    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField value={value} onCommit={handleCommit} />);

    const result = shallowRenderer.getRenderOutput();
    const { onRemoveInstance } = result.props;

    onRemoveInstance(['fieldName', '1']);

    committedPath.should.deep.equal(['fieldName']);
    committedValue.should.equal(Immutable.List(['a', 'c']));
  });

  it('should render \'or\' as the repeating field order indicator on values after the first', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField />);

    const result = shallowRenderer.getRenderOutput();
    const { renderOrderIndicator } = result.props;

    let indicator;

    indicator = renderOrderIndicator(1);

    indicator.should.have.property('type', 'div');
    indicator.props.children.should.have.property('type', 'div');
    expect(indicator.props.children.props.children).to.equal(null);

    indicator = renderOrderIndicator(2);

    indicator.should.have.property('type', 'div');
    indicator.props.children.should.have.property('type', 'div');

    const message = indicator.props.children.props.children;

    message.should.have.property('type', FormattedMessage);
    message.props.defaultMessage.should.equal('or');
  });

  it('should render \'/\' as the repeating field order indicator on values after the first if readOnly is true', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField readOnly />);

    const result = shallowRenderer.getRenderOutput();
    const { renderOrderIndicator } = result.props;

    let indicator;

    indicator = renderOrderIndicator(1);

    expect(indicator).to.equal(null);

    indicator = renderOrderIndicator(2);

    indicator.should.have.property('type', 'div');
    indicator.props.children.should.equal('/');
  });
});
