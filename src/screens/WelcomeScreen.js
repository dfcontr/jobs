import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use it to get a job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        // AsyncStorage.removeItem('fb_token'); // Uncomment this to test Facebook login
        let token = await AsyncStorage.getItem('fb_token');
        
        if (token) {
            this.setState({ token });
            this.props.navigation.navigate('map');
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        // React-navigation automatically passes the navigation object as props.
        // Class level functions do not have access to props (as they are instance level)
        this.props.navigation.navigate('auth');
    }

    render() {
        /*if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }*/

        return (
            <Slides 
                data={SLIDE_DATA} 
                onComplete={this.onSlidesComplete}
            />
        );
    }
}

export default WelcomeScreen;
