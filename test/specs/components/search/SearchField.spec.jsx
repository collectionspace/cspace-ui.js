import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import Field from '../../../../src/components/record/Field';
import SearchField from '../../../../src/components/search/SearchField';

const expect = chai.expect;

chai.should();

describe('SearchField', function suite() {
  it('should render a Field', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Field);
  });

  it('should pass parentPath, name, value, and onCommit props to the base Field', function test() {
    const parentPath = ['a', 'b'];
    const name = 'name';
    const value = 'value';
    const onCommit = () => null;

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchField
        parentPath={parentPath}
        name={name}
        value={value}
        onCommit={onCommit}
      />);

    const result = shallowRenderer.getRenderOutput();

    result.props.parentPath.should.equal(parentPath);
    result.props.name.should.equal(name);
    result.props.value.should.equal(value);
    result.props.onCommit.should.equal(onCommit);
  });

  it('should override props on the base Field', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<SearchField />);

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.label).to.equal(undefined);
    result.props.repeating.should.equal(false);
    result.props.viewType.should.equal('search');
    result.props.showQuickAdd.should.equal(false);
  });
});
