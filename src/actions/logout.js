import getSession from './cspace';
import { loadPrefs, savePrefs } from './prefs';

import {
  LOGOUT_STARTED,
  LOGOUT_FULFILLED,
} from '../constants/actionCodes';

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_STARTED,
  });

  dispatch(savePrefs());

  return getSession().logout()
    .then(response => dispatch({
      type: LOGOUT_FULFILLED,
      payload: response,
    }))
    .then(() => dispatch(loadPrefs()));
};

export default {};
