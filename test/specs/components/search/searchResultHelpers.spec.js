import Immutable from 'immutable';
import { getSort } from '../../../../src/components/search/searchResultHelpers';

const { expect } = chai;

describe('searchResultHelpers', () => {
  const config = {
    recordTypes: {
      collectionobject: {
        sort: {
          defaultSortBy: 'updatedAt',
          defaultSortDirection: 'desc',
        },
      },
      person: {
        columns: {
          default: {
            defaultSortBy: 'termDisplayName',
            defaultSortDirection: 'asc',
          },
        },
      },
    },
  };

  it('should return the sort from a search descriptor', () => {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        sort: 'objectNumber desc',
      },
    });

    const { sortBy, sortDir } = getSort(config, searchDescriptor);
    expect(sortBy).to.equal('objectNumber');
    expect(sortDir).to.equal('desc');
  });

  it('should return ascending when only the sort by is declared', () => {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        sort: 'objectNumber',
      },
    });

    const { sortBy, sortDir } = getSort(config, searchDescriptor);
    expect(sortBy).to.equal('objectNumber');
    expect(sortDir).to.equal('asc');
  });

  it('should use the sort config for default sort options', () => {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const { sortBy, sortDir } = getSort(config, searchDescriptor);
    expect(sortBy).to.equal('updatedAt');
    expect(sortDir).to.equal('desc');
  });

  it('should fallback to the column config for default sort options', () => {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'person',
      searchQuery: {},
    });

    const { sortBy, sortDir } = getSort(config, searchDescriptor);
    expect(sortBy).to.equal('termDisplayName');
    expect(sortDir).to.equal('asc');
  });

  it('should return default values when the sort config does not exist for a record', () => {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'other',
      searchQuery: {},
    });

    const { sortBy, sortDir } = getSort(config, searchDescriptor);
    expect(sortBy).to.equal('updatedAt');
    expect(sortDir).to.equal('desc');
  });
});
