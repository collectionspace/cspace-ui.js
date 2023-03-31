import React from 'react';
import PropTypes from 'prop-types';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { configKey } from '../../../../src/helpers/configHelpers';
import RangeSearchField from '../../../../src/components/search/RangeSearchField';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import RecordTypeProvider from '../../../helpers/RecordTypeProvider';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

chai.use(chaiImmutable);
chai.should();

const TestInput = (props) => {
  const {
    name,
    parentPath,
    value,
    onCommit,
  } = props;

  return (
    <input
      name={name}
      defaultValue={value}
      onBlur={(event) => onCommit([...parentPath, name], event.target.value)}
    />
  );
};

TestInput.propTypes = {
  parentPath: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  value: PropTypes.string,
  onCommit: PropTypes.func,
};

const config = {
  recordTypes: {
    collectionobject: {
      fields: {
        document: {
          'ns2:collectionobjects_common': {
            objectNumber: {
              [configKey]: {
                searchView: {
                  type: TestInput,
                },
              },
            },
          },
        },
      },
    },
  },
};

describe('RangeSearchField', () => {
  const parentPath = ['document', 'ns2:collectionobjects_common'];
  const name = 'objectNumber';

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <RangeSearchField
              parentPath={parentPath}
              name={name}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a start field and an end field', function test() {
    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <RangeSearchField
              parentPath={parentPath}
              name={name}
              value={Immutable.List(['start', 'end'])}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const inputs = this.container.querySelectorAll('input');

    inputs.length.should.equal(2);

    inputs[0].value.should.equal('start');
    inputs[1].value.should.equal('end');
  });

  it('should call onCommit when the start field is committed', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <RangeSearchField
              parentPath={parentPath}
              name={name}
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const inputs = this.container.querySelectorAll('input');

    const startInput = inputs[0];

    startInput.value = '1';

    Simulate.blur(startInput);

    committedPath.should.deep.equal(['document', 'ns2:collectionobjects_common', 'objectNumber']);
    committedValue.should.equal(Immutable.List(['1']));
  });

  it('should call onCommit when the end field is committed', function test() {
    let committedPath = null;
    let committedValue = null;

    const handleCommit = (pathArg, valueArg) => {
      committedPath = pathArg;
      committedValue = valueArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <RecordTypeProvider recordType="collectionobject">
            <RangeSearchField
              parentPath={parentPath}
              name={name}
              onCommit={handleCommit}
            />
          </RecordTypeProvider>
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const inputs = this.container.querySelectorAll('input');

    const endInput = inputs[1];

    endInput.value = '5';

    Simulate.blur(endInput);

    committedPath.should.deep.equal(['document', 'ns2:collectionobjects_common', 'objectNumber']);
    committedValue.should.equal(Immutable.List([undefined, '5']));
  });
});
