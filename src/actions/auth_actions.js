import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { 
    FACEBOOK_LOGIN_SUCCESS, 
    FACEBOOK_LOGIN_FAIL 
} from './types';


// AsyncStorage = local storage on browser
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');
// Returns a promise

// Function defines single expresion and is returned by default? 
// Drop curly braces and return keyword.
// Single argument on arrow function? Drop parens.
// This uses async/await with redux thunk
export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        // Facebook login is done, dispatch action
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('116209592438494', {
        permissions: ['public_profile']
    });

    // Something went wrong
    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
