import getSession from '../helpers/session';
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

  return getSession().logout(false)
    .then((response) => dispatch({
      type: LOGOUT_FULFILLED,
      payload: response,
    }))
    .then(() => dispatch(loadPrefs()));
};

export default {};
