import Immutable from 'immutable';
import createGridConfig from '../../../../../src/plugins/recordTypes/collectionobject/grid';
import createConfigContext from '../../../../../src/helpers/createConfigContext';
import createTestContainer from '../../../../helpers/createTestContainer';
import { render } from '../../../../helpers/renderHelpers';

const { expect } = chai;
chai.should();

describe('collectionobject grid layout', () => {
  const configContext = createConfigContext();
  const gridConfig = createGridConfig(configContext);

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  describe('title formatter', () => {
    const {
      title: {
        formatter,
      },
    } = gridConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should return null if the objectNumber is not present', () => {
      const title = formatter(Immutable.fromJS({
        ignoredField: 'text-content',
      }));

      expect(title).to.equal(null);
    });

    it('should use the objectNumber', function test() {
      const objectNumber = '1-234';
      const formatted = formatter(Immutable.fromJS({
        objectNumber,
      }));

      render(formatted, this.container);
      const h2 = this.container.querySelector('h2');
      h2.textContent.should.contain(objectNumber);
    });
  });

  describe('subtitle formatter', () => {
    const title = 'object title';
    const objectNameControlled = 'controlledName';
    const objectName = 'objectName';
    const taxon = 'taxon';
    const form = 'preservationForm';

    const {
      subtitle: {
        formatter,
      },
    } = gridConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should prefer the title', function test() {
      const formatted = formatter(Immutable.fromJS({
        title,
        objectNameControlled,
        objectName,
        taxon,
        form,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(title);
      p.textContent.should.not.contain(objectNameControlled);
      p.textContent.should.not.contain(objectName);
      p.textContent.should.not.contain(taxon);
      p.textContent.should.not.contain(form);
    });

    it('should fallback to the object names', function test() {
      const formatted = formatter(Immutable.fromJS({
        objectNameControlled,
        objectName,
        taxon,
        form,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(objectNameControlled);
      p.textContent.should.contain(objectName);
      p.textContent.should.not.contain(title);
      p.textContent.should.not.contain(taxon);
      p.textContent.should.not.contain(form);
    });

    it('should fallback the taxon with form', function test() {
      const formatted = formatter(Immutable.fromJS({
        taxon,
        form,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(taxon);
      p.textContent.should.contain(form);
      p.textContent.should.not.contain(objectNameControlled);
      p.textContent.should.not.contain(objectName);
      p.textContent.should.not.contain(title);
    });
  });

  describe('description formatter', () => {
    const agent = 'objectAgent';
    const agentRole = 'agentRole';
    const fieldCollector = 'objectFieldCollector';
    const fieldCollectorRole = 'fcRole';

    const {
      description: {
        formatter,
      },
    } = gridConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should prefer the agent with role', function test() {
      const formatted = formatter(Immutable.fromJS({
        agent,
        agentRole,
        fieldCollector,
        fieldCollectorRole,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(agent);
      p.textContent.should.contain(agentRole);
      p.textContent.should.not.contain(fieldCollector);
      p.textContent.should.not.contain(fieldCollectorRole);
    });

    it('should fallback the field collector', function test() {
      const formatted = formatter(Immutable.fromJS({
        fieldCollector,
        fieldCollectorRole,
      }));

      render(formatted, this.container);
      const p = this.container.querySelector('p');
      p.textContent.should.contain(fieldCollector);
      p.textContent.should.contain(fieldCollectorRole);
      p.textContent.should.not.contain(agent);
      p.textContent.should.not.contain(agentRole);
    });
  });

  describe('tags formatter', () => {
    const {
      tags: {
        formatter,
      },
    } = gridConfig;

    it('should have a formatter that is a function', () => {
      formatter.should.be.a('function');
    });

    it('should always return null', () => {
      expect(formatter(Immutable.fromJS({}))).to.equal(null);
      expect(formatter(Immutable.fromJS({
        contentConcepts: {
          contentConcept: [
            'concept-1',
            'concept-2',
          ],
        },
      }))).to.equal(null);
    });
  });
});
