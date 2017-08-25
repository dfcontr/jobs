import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props); // This line is not necessary
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
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
