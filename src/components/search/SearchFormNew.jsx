import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewSearchShown } from '../../actions/prefs';
import { STATUS_SUCCESS } from '../../constants/notificationStatusCodes';
import { showNotification } from '../../actions/notification';
import { getNewSearchShown } from '../../reducers';

const SearchFormNew = () => {
  const dispatch = useDispatch();
  const newSearchShown = useSelector((state) => getNewSearchShown(state));

  useEffect(() => {
    if (!newSearchShown) {
      // TODO: message needs to be specified
      dispatch(showNotification({
        items: [{
          message: {
            id: 'newSearchForm.informative',
            defaultMessage: 'This is an informative notification about the new search form. It includes:...',
          },
        }],
        date: new Date(),
        status: STATUS_SUCCESS,
      }));
      dispatch(setNewSearchShown());
    }
  }, []);

  return (
    <div>
      <p>New Search Form Placeholder</p>
    </div>
  );
};

export default SearchFormNew;
