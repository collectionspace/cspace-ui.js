import Field from '../../../../../../src/components/record/Field';
import form from '../../../../../../src/plugins/recordTypes/valuation/forms/default';
import createConfigContext from '../../../../../../src/helpers/createConfigContext';

chai.should();

describe('valuation record default form', () => {
  it('should be a Field', () => {
    const configContext = createConfigContext();
    const { template } = form(configContext);

    template.type.should.equal(Field);
  });
});
