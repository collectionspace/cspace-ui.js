import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewSearchShown } from '../../actions/prefs';
import { STATUS_SUCCESS } from '../../constants/notificationStatusCodes';
import { showNotification } from '../../actions/notification';
import { getNewSearchShown } from '../../reducers';

const SearchFormNew = () => {
  const dispatch = useDispatch();
  // TODO: move selector to reducer
  const newSearchShown = useSelector((state) => getNewSearchShown(state));

  useEffect(() => {
    if (!newSearchShown) {
      // TODO: dispatch showNotification, call only on render, fix message
      dispatch(showNotification({
        items: [{
          message: {
            id: 'batch.running',
            defaultMessage: (
              <div>
                This is an informative notification about the new search form. It includes:
                <ul>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
                and some more new cool features!
              </div>
            ),
          },
        }],
        date: new Date(),
        status: STATUS_SUCCESS,
      }));
      dispatch(setNewSearchShown());
    }
  }, [dispatch, newSearchShown]);

  return (
    <div>
      <p>New Search Form Placeholder</p>
    </div>
  );
};

export default SearchFormNew;
