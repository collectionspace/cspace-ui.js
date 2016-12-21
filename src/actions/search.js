import getSession from './cspace';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_FULFILLED = 'SEARCH_FULFILLED';
export const SEARCH_REJECTED = 'SEARCH_REJECTED';

export const search = (recordType, serviceConfig, searchParams) => (dispatch) => {
  dispatch({
    type: SEARCH_STARTED,
    meta: {
      recordType,
      serviceConfig,
      searchParams,
    },
  });

  const serviceName = serviceConfig.name;

  const config = {
    params: {
      ...searchParams,
      wf_deleted: false,
    },
  };

  return getSession().read(serviceName, config)
    .then(response => dispatch({
      type: SEARCH_FULFILLED,
      payload: response,
      meta: {
        recordType,
        serviceConfig,
        searchParams,
      },
    }))
    .catch(error => dispatch({
      type: SEARCH_REJECTED,
      payload: error,
      meta: {
        recordType,
        serviceConfig,
        searchParams,
      },
    }));
};
