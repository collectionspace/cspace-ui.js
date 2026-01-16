import React from 'react';
import Immutable from 'immutable';
import { IntlProvider } from 'react-intl';
import createDetailListConfig from '../../../../../src/plugins/recordTypes/collectionobject/detailList';
import createConfigContext from '../../../../../src/helpers/createConfigContext';
import createTestContainer from '../../../../helpers/createTestContainer';
import { render } from '../../../../helpers/renderHelpers';

const { expect } = chai;
chai.should();

const objectNumber = 'OBJ 2026.1';
const briefDescription = 'brief description';
const title = 'object title';
const objectName = 'objectName';
const objectNameControlled = 'controlled';

const agent = 'objectAgent';
const agentRole = 'agentRole';
const objectProductionPlace = 'productionPlace';
const objectProductionDate = 'productionDate';

const fieldCollector = 'objectFieldCollector';
const fieldCollectorRole = 'fcRole';
const fieldCollectionSite = 'fieldSite';
const fieldCollectionPlace = 'fieldPlace';
const fieldCollectionDate = 'fieldDate';

const taxon = 'taxon';
const form = 'preservationForm';

describe('collectionobject detail list layout', () => {
  const configContext = createConfigContext();
  const detailListConfig = createDetailListConfig(configContext);

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  describe('title formatter', () => {
    const {
      title: {
        formatter,
      },
    } = detailListConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should contain the objectNumber', function test() {
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
      }));

      render(formatted, this.container);
      const h2 = this.container.querySelector('h2');
      h2.textContent.should.contain(objectNumber);
    });

    it('should prefer the title', function test() {
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
        title,
        objectNameControlled,
        objectName,
        taxon,
        form,
      }));

      render(formatted, this.container);
      const h2 = this.container.querySelector('h2');
      h2.textContent.should.contain(objectNumber);
      h2.textContent.should.contain(title);
      h2.textContent.should.not.contain(objectNameControlled);
      h2.textContent.should.not.contain(objectName);
      h2.textContent.should.not.contain(taxon);
      h2.textContent.should.not.contain(form);
    });

    describe('object name fallback', () => {
      it('should use both object names when supplied', function test() {
        const formatted = formatter(Immutable.fromJS({
          objectNumber,
          objectNameControlled,
          objectName,
          taxon,
          form,
        }));

        render(formatted, this.container);
        const h2 = this.container.querySelector('h2');
        h2.textContent.should.contain(objectNameControlled);
        h2.textContent.should.contain(objectName);
        h2.textContent.should.not.contain(title);
        h2.textContent.should.not.contain(taxon);
        h2.textContent.should.not.contain(form);
      });

      it('should use the controlled object name when available', function test() {
        const formatted = formatter(Immutable.fromJS({
          objectNumber,
          objectNameControlled,
          taxon,
          form,
        }));

        render(formatted, this.container);
        const h2 = this.container.querySelector('h2');
        h2.textContent.should.contain(objectNameControlled);
        h2.textContent.should.not.contain(objectName);
        h2.textContent.should.not.contain(title);
        h2.textContent.should.not.contain(taxon);
        h2.textContent.should.not.contain(form);
      });

      it('should use the uncontrolled object name when available', function test() {
        const formatted = formatter(Immutable.fromJS({
          objectNumber,
          objectName,
          taxon,
          form,
        }));

        render(formatted, this.container);
        const h2 = this.container.querySelector('h2');
        h2.textContent.should.contain(objectName);
        h2.textContent.should.not.contain(objectNameControlled);
        h2.textContent.should.not.contain(title);
        h2.textContent.should.not.contain(taxon);
        h2.textContent.should.not.contain(form);
      });
    });

    describe('taxon fallback', () => {
      it('should use the taxon with form when supplied', function test() {
        const formatted = formatter(Immutable.fromJS({
          objectNumber,
          taxon,
          form,
        }));

        render(formatted, this.container);
        const h2 = this.container.querySelector('h2');
        h2.textContent.should.contain(taxon);
        h2.textContent.should.contain(form);
        h2.textContent.should.not.contain(objectNameControlled);
        h2.textContent.should.not.contain(objectName);
        h2.textContent.should.not.contain(title);
      });

      it('should omit the taxon with form when taxon is missing', function test() {
        const formatted = formatter(Immutable.fromJS({
          objectNumber,
          form,
        }));

        render(formatted, this.container);
        const h2 = this.container.querySelector('h2');
        h2.textContent.should.not.contain(taxon);
        h2.textContent.should.not.contain(form);
        h2.textContent.should.not.contain(objectNameControlled);
        h2.textContent.should.not.contain(objectName);
        h2.textContent.should.not.contain(title);
      });
    });
  });

  describe('subtitle formatter', () => {
    const {
      subtitle: {
        formatter,
      },
    } = detailListConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should return production and field collector data when available', function test() {
      const formatted = formatter(Immutable.fromJS({
        agent,
        agentRole,
        objectProductionDate,
        objectProductionPlace,
        fieldCollector,
        fieldCollectorRole,
        fieldCollectionDate,
        fieldCollectionPlace,
        fieldCollectionSite,
      }));

      render(formatted, this.container);
      const nodeList = this.container.querySelectorAll('h3');

      nodeList.length.should.equal(2);
      const agentText = nodeList[0].textContent;
      agentText.should.contain(agent);
      agentText.should.contain(agentRole);
      agentText.should.contain(objectProductionDate);
      agentText.should.contain(objectProductionPlace);
      const fieldCollectorText = nodeList[1].textContent;
      fieldCollectorText.should.contain(fieldCollector);
      fieldCollectorText.should.contain(fieldCollectorRole);
      fieldCollectorText.should.contain(fieldCollectionDate);
      fieldCollectorText.should.contain(fieldCollectionPlace);
      fieldCollectorText.should.contain(fieldCollectionSite);
    });

    describe('agent formatting', () => {
      it('should skip the agent role when the agent is missing', function test() {
        const formatted = formatter(Immutable.fromJS({
          agentRole,
          objectProductionDate,
          objectProductionPlace,
        }));

        render(formatted, this.container);
        const h3Text = this.container.querySelector('h3').textContent;

        h3Text.should.not.contain(agent);
        h3Text.should.contain(objectProductionDate);
        h3Text.should.contain(objectProductionPlace);
      });

      it('should not return an agent if only the date is provided', function test() {
        const formatted = formatter(Immutable.fromJS({
          objectProductionDate,
        }));

        render(formatted, this.container);
        const h3 = this.container.querySelector('h3');

        expect(h3).to.equal(null);
      });
    });

    describe('field collector formatting', () => {
      it('should skip the field collector role when the field collector is missing', function test() {
        const formatted = formatter(Immutable.fromJS({
          fieldCollectorRole,
          fieldCollectionDate,
          fieldCollectionPlace,
          fieldCollectionSite,
        }));

        render(formatted, this.container);
        const h3Text = this.container.querySelector('h3').textContent;

        h3Text.should.contain(fieldCollectionDate);
        h3Text.should.contain(fieldCollectionPlace);
        h3Text.should.contain(fieldCollectionSite);

        h3Text.should.not.contain(fieldCollector);
        h3Text.should.not.contain(fieldCollectorRole);
      });

      it('should use the site when provided', function test() {
        const formatted = formatter(Immutable.fromJS({
          fieldCollectionSite,
          fieldCollectionDate,
        }));

        render(formatted, this.container);
        const h3Text = this.container.querySelector('h3').textContent;

        h3Text.should.contain(fieldCollectionSite);
        h3Text.should.contain(fieldCollectionDate);
        h3Text.should.not.contain(fieldCollector);
        h3Text.should.not.contain(fieldCollectionPlace);
      });

      it('should return the place when provided', function test() {
        const formatted = formatter(Immutable.fromJS({
          fieldCollectionPlace,
        }));

        render(formatted, this.container);
        const h3Text = this.container.querySelector('h3').textContent;

        h3Text.should.contain(fieldCollectionPlace);
        h3Text.should.not.contain(fieldCollector);
        h3Text.should.not.contain(fieldCollectorRole);
        h3Text.should.not.contain(fieldCollectionDate);
        h3Text.should.not.contain(fieldCollectionSite);
      });

      it('should return null when only the date is provided', function test() {
        const formatted = formatter(Immutable.fromJS({
          fieldCollectionDate,
        }));

        render(formatted, this.container);
        const h3 = this.container.querySelector('h3');
        expect(h3).to.equal(null);
      });
    });
  });

  describe('description formatter', () => {
    const {
      description: { formatter },
    } = detailListConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should display nothing when no description is supplied', function test() {
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      expect(p).to.equal(null);
    });

    it('should display the brief description when supplied', function test() {
      const formatted = formatter(Immutable.fromJS({
        briefDescription,
        objectNumber,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(briefDescription);
      p.textContent.should.not.contain(objectNumber);
    });
  });

  describe('tags formatter', () => {
    const {
      tags: { formatter },
    } = detailListConfig;

    const fooConcept = 'foo';
    const barConcept = 'ba';

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should display nothing when no content concepts are supplied', function test() {
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      expect(p).to.equal(null);
    });

    it('should display all tags when a list is supplied', function test() {
      const formatted = formatter(Immutable.fromJS({
        contentConcepts: {
          contentConcept: Immutable.List.of(fooConcept, barConcept),
        },
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(fooConcept);
      p.textContent.should.contain(barConcept);
    });

    it('should display a single tag when one is supplied', function test() {
      const formatted = formatter(Immutable.fromJS({
        contentConcepts: {
          contentConcept: fooConcept,
        },
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(fooConcept);
      p.textContent.should.not.contain(barConcept);
    });
  });

  describe.only('aside formatter', () => {
    const {
      aside: { formatter },
    } = detailListConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should print the current location and responsible department', function test() {
      const responsibleDepartment = 'responsibleDepartment';
      const computedCurrentLocation = 'currentLocation';
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
        responsibleDepartment,
        computedCurrentLocation,
      }));

      render(formatted, this.container);
      const nodeList = this.container.querySelectorAll('div');
      nodeList.length.should.equal(2);

      const locationDiv = nodeList[0].textContent;
      locationDiv.should.contain(computedCurrentLocation);
      const departmentDiv = nodeList[1].textContent;
      departmentDiv.should.contain(responsibleDepartment);
    });

    it('should display \'Storage Location not found\' when no location data is present', function test() {
      const noLocationText = 'Storage Location not assigned';
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
      }));

      render(formatted, this.container);
      const locationDiv = this.container.querySelector('div');
      locationDiv.textContent.should.contain(noLocationText);
    });

    it('should omit the responsible department header when no data is present', function test() {
      const responsibleDepartmentHeader = 'Responsible Department';
      const computedCurrentLocation = 'currentLocation';
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
        computedCurrentLocation,
      }));

      render(formatted, this.container);
      const nodeList = this.container.querySelectorAll('div');
      nodeList.length.should.equal(1);

      const locationDiv = nodeList[0].textContent;
      locationDiv.should.not.contain(responsibleDepartmentHeader);
    });
  });

  describe('footer formatter', () => {
    const {
      footer: { formatter },
    } = detailListConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should display nothing when no updatedAt is supplied', function test() {
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
      }));

      render(formatted, this.container);
      const span = this.container.querySelector('span');
      expect(span).to.equal(null);
    });

    it('should display the date when no updatedAt', function test() {
      const expected = 'Modified: 1/26/2017';
      const updatedAt = '2017-01-26T08:08:47.026Z';
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
        updatedAt,
      }));

      render(
        <IntlProvider locale="en">
          {formatted}
        </IntlProvider>, this.container,
      );
      const span = this.container.querySelector('span');
      span.textContent.should.equal(expected);
    });
  });
});
