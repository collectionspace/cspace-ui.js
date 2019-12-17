import Field from '../../../../../../src/components/record/Field';
import form from '../../../../../../src/plugins/recordTypes/citation/forms/default';
import createConfigContext from '../../../../../../src/helpers/createConfigContext';

chai.should();

describe('citation record default form', () => {
  it('should be a Field', () => {
    const configContext = createConfigContext();
    const { template } = form(configContext);

    template.type.should.equal(Field);
  });
});
