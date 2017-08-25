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

    console.log('====================================');
    console.log('Token exists', token);
    console.log('====================================');

    debugger

    if (token) {
        // Facebook login is done, dispatch action
        console.log('====================================');
        console.log('Dispatch login success');
        console.log('====================================');
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        console.log('====================================');
        console.log('Token does not exist');
        console.log('====================================');
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('116209592438494', {
        permissions: ['public_profile']
    });

    console.log('====================================');
    console.log('New token and type', token, type);
    console.log('====================================');

    debugger
    // Something went wrong
    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    debugger
    await AsyncStorage.setItem('fb_token', token);

    debugger
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
