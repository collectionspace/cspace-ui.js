import React from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import { baseComponents as inputComponents } from 'cspace-input';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import ConfigProvider from '../../../../src/components/config/ConfigProvider';
import TermPickerInput from '../../../../src/components/record/TermPickerInput';

chai.should();

const { TermPickerInput: BaseTermPickerInput } = inputComponents;

describe('TermPickerInput', () => {
  const config = {};

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a cspace-input TermPickerInput', function test() {
    const resultTree = render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <TermPickerInput source="vocabName" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    findRenderedComponentWithType(resultTree, BaseTermPickerInput).should.not.equal(null);
  });

  it('should call readTerms when mounted', function test() {
    const vocabName = 'vocabName';

    let readTermsSource = null;

    const readTerms = (sourceArg) => {
      readTermsSource = sourceArg;
    };

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <TermPickerInput source={vocabName} readTerms={readTerms} />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    readTermsSource.should.equal(vocabName);
  });

  it('should call readTerms when new perms are supplied via props', function test() {
    const vocabName = 'vocabName';

    let readTermsSource = null;

    const readTerms = (sourceArg) => {
      readTermsSource = sourceArg;
    };

    const perms = Immutable.fromJS({
      vocabulary: {
        data: 'CRUDL',
      },
    });

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <TermPickerInput
            perms={perms}
            source={vocabName}
          />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const newPerms = perms.setIn(['vocabulary', 'data'], 'CRUL');

    render(
      <IntlProvider locale="en">
        <ConfigProvider config={config}>
          <TermPickerInput
            perms={newPerms}
            source={vocabName}
            readTerms={readTerms}
          />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    readTermsSource.should.equal(vocabName);
  });

  it('should call intl.formatMessage to format the status message', function test() {
    const messages = {
      'termPickerInput.count': 'formatted count',
    };

    const resultTree = render(
      <IntlProvider locale="en" messages={messages}>
        <ConfigProvider config={config}>
          <TermPickerInput source="vocabName" />
        </ConfigProvider>
      </IntlProvider>, this.container,
    );

    const termPickerInput = findRenderedComponentWithType(resultTree, BaseTermPickerInput);

    termPickerInput.props.formatStatusMessage().should.equal('formatted count');
  });
});
