import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
import * as actions from '../actions';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use it to get a job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
         //AsyncStorage.removeItem('fb_token'); // Uncomment this to test Facebook login
        /*let token = await AsyncStorage.getItem('fb_token');
        
        if (token) {
            this.setState({ token });
            this.props.navigation.navigate('map');
        } else {
            this.setState({ token: false });
        }*/

        this.props.checkToken();
    }

    componentWillReceiveProps(nextProps) {
        this.redirectToMap(nextProps);
    }

    onSlidesComplete = () => {
        // React-navigation automatically passes the navigation object as props.
        // Class level functions do not have access to props (as they are instance level)
        this.props.navigation.navigate('auth');
    }

    goToFacebookLogin = () => {
        this.props.navigation.navigate('auth');
    }

    redirectToMap({ token }) {
        if (!_.isNull(token)) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        if (_.isNull(this.props.token)) {
            return (
                <View style={styles.container}>
                    <Slides data={SLIDE_DATA} onComplete={this.goToFacebookLogin} />
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = {
    container: {
        flex: 1
    }
};

const mapStateToProps = ({ auth }) => {
    const { token } = auth;
    return { token };
};
 
export default connect(mapStateToProps, actions)(WelcomeScreen);
