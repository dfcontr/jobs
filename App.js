import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Expo, { Notifications } from 'expo';
import { Provider } from 'react-redux';

import store from './src/store';
import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import registerForNotifications from './services/push_notifications';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      // The notification is not being received, debugger not being hit
      debugger;
      const { data: { text }, origin } = notification; // = const text = notification.data.text

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok' }]
        );
      }   
    });
  }

  render() {
    // Big gotcha: whenever React Navigation renders one of your navigators (all navigators?),
    // it instantly renders all of the screens within that navigator
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true // Prevent navigator from rendering all screens
    });

    // Wrapping navigator with view might not be the best solution,
    // but I have not make it work with the headerStyle navigationOption
    /*return (
      <Provider store={store}>
        <View style={{ flex: 1, marginTop: Expo.Constants.statusBarHeight }}>
          <MainNavigator />
        </View>
      </Provider>
    );*/

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Redux steps:
// 1: Instance of Redux Store
// 2: Provider tag, pass store as prop
// 3: At least 1 reducer defined (which returns a not undefined object)
// 4: All components have access to the store by using the connect helper from react-redux
// 5: Create action types file
// 6: Create action creators
