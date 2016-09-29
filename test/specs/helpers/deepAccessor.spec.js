import chai from 'chai';
import Immutable from 'immutable';

import { deepGet, deepSet } from '../../../src/helpers/deepAccessor';

const expect = chai.expect;

chai.should();

describe('deepGet', function suite() {
  it('should return undefined when data is null or undefined', function test() {
    expect(deepGet(null, ['color'])).to.equal(undefined);
    expect(deepGet(undefined, ['color'])).to.equal(undefined);
  });

  it('should get a child value', function test() {
    const data = Immutable.fromJS({
      color: 'red',
    });

    deepGet(data, ['color']).should.equal('red');
  });

  it('should get a nested Map value', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
      },
    });

    deepGet(data, ['common', 'color']).should.equal('red');
  });

  it('should get a deeply nested Map value', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
      },
    });

    deepGet(data, ['common', 'otherNumber', 'number']).should.equal('123');
  });

  it('should return undefined for a non-existent path', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
      },
    });

    expect(deepGet(data, ['common', 'something', 'number'])).to.equal(undefined);
  });

  it('should get a nested list value', function test() {
    const data = Immutable.fromJS({
      comment: [
        'comment 1',
        'comment 2',
      ],
    });

    deepGet(data, ['comment', '0']).should.equal('comment 1');
    deepGet(data, ['comment', '1']).should.equal('comment 2');
  });

  it('should set a deeply nested list value', function test() {
    const data = Immutable.fromJS({
      common: {
        otherNumber: [
          {
            number: '123',
            type: 'type 1',
            comment: [
              'number comment 1',
              'number comment 2',
            ],
          },
          {
            number: '456',
            type: 'type 2',
          },
        ],
      },
      comment: [
        'comment 1',
        'comment 2',
      ],
    });

    deepGet(data, ['common', 'otherNumber', '0', 'comment', '1']).should.equal('number comment 2');
  });

  it('should treat a single (non-list) value as a list when it is keyed by \'0\'', function test() {
    const data = Immutable.fromJS({
      common: {
        otherNumber: {
          number: '123',
          type: 'type 1',
          comment: [
            'number comment 1',
            'number comment 2',
          ],
        },
      },
    });

    deepGet(data, ['common', 'otherNumber', '0', 'comment', '1']).should.equal('number comment 2');
    deepGet(data, ['common', 'otherNumber', '0', 'number', '0']).should.equal('123');
  });
});

describe('deepSet', function suite() {
  it('should set a child value', function test() {
    const data = Immutable.fromJS({
      color: 'red',
    });

    let updatedData;

    updatedData = deepSet(data, ['color'], 'blue').toJS();

    updatedData.should.deep.equal({
      color: 'blue',
    });

    updatedData = deepSet(data, ['name'], 'name 1').toJS();

    updatedData.should.deep.equal({
      color: 'red',
      name: 'name 1',
    });
  });

  it('should set a nested Map value', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
      },
    });

    const updatedData = deepSet(data, ['common', 'color'], 'blue').toJS();

    updatedData.should.deep.equal({
      common: {
        color: 'blue',
      },
    });
  });

  it('should set a deeply nested Map value', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
      },
    });

    const updatedData = deepSet(data, ['common', 'otherNumber', 'number'], '456').toJS();

    updatedData.should.deep.equal({
      common: {
        color: 'red',
        otherNumber: {
          number: '456',
        },
      },
    });
  });

  it('should set a nested list value', function test() {
    const data = Immutable.fromJS({
      comment: [
        'comment 1',
        'comment 2',
      ],
    });

    const updatedData = deepSet(data, ['comment', '1'], 'new comment').toJS();

    updatedData.should.deep.equal({
      comment: [
        'comment 1',
        'new comment',
      ],
    });
  });

  it('should set a deeply nested list value', function test() {
    const data = Immutable.fromJS({
      common: {
        otherNumber: [
          {
            number: '123',
            type: 'type 1',
            comment: [
              'number comment 1',
              'number comment 2',
            ],
          },
          {
            number: '456',
            type: 'type 2',
          },
        ],
      },
      comment: [
        'comment 1',
        'comment 2',
      ],
    });

    const updatedData = deepSet(data,
      ['common', 'otherNumber', '0', 'comment', '1'], 'new type').toJS();

    updatedData.should.deep.equal({
      common: {
        otherNumber: [
          {
            number: '123',
            type: 'type 1',
            comment: [
              'number comment 1',
              'new type',
            ],
          },
          {
            number: '456',
            type: 'type 2',
          },
        ],
      },
      comment: [
        'comment 1',
        'comment 2',
      ],
    });
  });

  it('should create missing Maps', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
      },
    });

    let updatedData;

    updatedData = deepSet(data, ['common', 'titleGroup', 'title'], 'title 1').toJS();

    updatedData.should.deep.equal({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
        titleGroup: {
          title: 'title 1',
        },
      },
    });

    updatedData = deepSet(data,
      ['common', 'otherNumber', 'nestedGroup', 'nestedField'], 'some value').toJS();

    updatedData.should.deep.equal({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
          nestedGroup: {
            nestedField: 'some value',
          },
        },
      },
    });
  });

  it('should create missing Lists', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
      },
    });

    const updatedData = deepSet(data,
      ['common', 'titleGroupList', 'titleGroup', '0', 'title'], 'title 1').toJS();

    updatedData.should.deep.equal({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
        titleGroupList: {
          titleGroup: [
            {
              title: 'title 1',
            },
          ],
        },
      },
    });
  });

  it('should promote non-list values to lists when keyed with a numeric key', function test() {
    const data = Immutable.fromJS({
      common: {
        color: 'red',
        otherNumber: {
          number: '123',
        },
      },
    });

    let updatedData;

    updatedData = deepSet(data, ['common', 'color', '1'], 'blue').toJS();

    updatedData.should.deep.equal({
      common: {
        color: [
          'red',
          'blue',
        ],
        otherNumber: {
          number: '123',
        },
      },
    });

    updatedData = deepSet(data, ['common', 'otherNumber', '1', 'number'], '456').toJS();

    updatedData.should.deep.equal({
      common: {
        color: 'red',
        otherNumber: [
          {
            number: '123',
          },
          {
            number: '456',
          },
        ],
      },
    });
  });
});
