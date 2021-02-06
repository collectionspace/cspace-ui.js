import chaiAsPromised from 'chai-as-promised';
import { validateNotInUse } from '../../../src/helpers/validationHelpers';
import createConfigContext from '../../../src/helpers/createConfigContext';

const { expect } = chai;

chai.use(chaiAsPromised);
chai.should();

describe('validationHelpers', () => {
  describe('validateNotInUse', () => {
    it('should return an error if the specified field value exists on a different record', () => {
      const configContext = createConfigContext();

      configContext.actions.findFirst = () => Promise.resolve({
        data: {
          'ns2:abstract-common-list': {
            'list-item': {
              csid: '5678',
            },
          },
        },
      });

      const validationContext = {
        recordType: 'loanin',
        csid: '1234',
        data: 'number',
      };

      return validateNotInUse({
        configContext,
        validationContext,
        fieldName: 'loansin_common:loanInNumber',
      }).should.eventually.deep.equal({
        code: 'ID_IN_USE',
        message: undefined,
        nonblocking: true,
        value: 'number',
      });
    });

    it('should return undefined if the specified field value exists on a the same record', () => {
      const configContext = createConfigContext();

      configContext.actions.findFirst = () => Promise.resolve({
        data: {
          'ns2:abstract-common-list': {
            'list-item': {
              csid: '1234',
            },
          },
        },
      });

      const validationContext = {
        recordType: 'loanin',
        csid: '1234',
        data: 'number',
      };

      return validateNotInUse({
        configContext,
        validationContext,
        fieldName: 'loansin_common:loanInNumber',
      }).then((error) => {
        expect(error).to.equal(undefined);
      });
    });

    it('should return undefined if the specified field value does not exist on any record', () => {
      const configContext = createConfigContext();

      configContext.actions.findFirst = () => Promise.resolve({
        data: {},
      });

      const validationContext = {
        recordType: 'loanin',
        csid: '1234',
        data: 'number',
      };

      return validateNotInUse({
        configContext,
        validationContext,
        fieldName: 'loansin_common:loanInNumber',
      }).then((error) => {
        expect(error).to.equal(undefined);
      });
    });
  });
});
