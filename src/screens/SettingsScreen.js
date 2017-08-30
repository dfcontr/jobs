import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../actions';

class SettingsScreen extends Component {
    render() {
        return (
            <View>
                <Button 
                    title="Reset Liked Jobs"
                    backgroundColor="#F44336"
                    icon={{ name: 'delete-forever' }}
                    onPress={this.props.clearLikedJobs}
                    large
                />
            </View>
        );
    }
}

export default connect(null, actions)(SettingsScreen);
