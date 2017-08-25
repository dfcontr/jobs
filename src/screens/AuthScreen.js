import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        AsyncStorage.removeItem('fb_token');
        this.props.facebookLogin();
        debugger
        this.onAuthComplete(this.props); // This line is not necessary
        AsyncStorage.removeItem('fb_token');
    }

    componentWillReceiveProps(nextProps) {
        debugger
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        debugger
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View>
                <Text>Hi, I am Auth</Text>
            </View>
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
