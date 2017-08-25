import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
    // React Nativation navigators look at this property
    // for class level configuration
    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        headerRight: (
            <Button
                title="Settings"
                onPress={() => { navigation.navigate('settings'); }}
                backgroundColor="rgba(0, 0, 0, 0)"
                color="rgba(0, 122, 255, 1)"
            />
        )
    })

    render() {
        return (
            <View>
                <Text>Hi, I am Review</Text>
            </View>
        );
    }
}

export default ReviewScreen;
