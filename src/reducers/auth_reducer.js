import { 
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL 
} from '../actions/types';

export default function (state = {}, action) {
    debugger
    switch (action.type) {
      case FACEBOOK_LOGIN_SUCCESS:
        return { token: action.payload };
      case FACEBOOK_LOGIN_FAIL:
        return { token: null };
      default:
        return state;
    }
  }
