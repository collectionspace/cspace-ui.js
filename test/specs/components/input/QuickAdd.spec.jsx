import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import QuickAdd from '../../../../src/components/input/QuickAdd';

import createTestContainer from '../../../helpers/createTestContainer';

chai.should();

describe('QuickAdd', function suite() {
  const recordPlugins = {
    person: {
      serviceConfig: {
        name: 'personauthorities',
        vocabularies: {
          person: {
            messageDescriptors: {
              vocabNameTitle: {
                id: 'vocab.personauthorities.person.nameTitle',
                defaultMessage: 'Local Persons',
              },
            },
          },
        },
        quickAddData: () => {},
      },
    },
  };

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <QuickAdd
          authority="person/person"
          recordPlugins={recordPlugins}
        />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a button for each vocabulary that is configured in the record plugins', function test() {
    render(
      <IntlProvider locale="en">
        <QuickAdd
          authority="person/person,person/unknown"
          recordPlugins={recordPlugins}
        />
      </IntlProvider>, this.container);

    this.container.querySelectorAll('button').length.should.equal(1);
  });

  it('should call add when an add button is clicked', function test() {
    let funcCalled = false;

    const add = () => {
      funcCalled = true;
    };

    render(
      <IntlProvider locale="en">
        <QuickAdd
          add={add}
          authority="person/person"
          recordPlugins={recordPlugins}
        />
      </IntlProvider>, this.container);

    Simulate.click(this.container.querySelector('button'));

    funcCalled.should.equal(true);
  });

  // TODO: Add tests.
});
