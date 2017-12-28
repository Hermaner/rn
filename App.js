import React from 'react';
import { AppRegistry, AsyncStorage, Platform, DeviceEventEmitter, NativeAppEventEmitter } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as WeChat from 'react-native-wechat';
import JPushModule from 'jpush-react-native';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import Storage from 'react-native-storage';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    WeChat.registerApp('wx26b5853e6e77d138');
    persistStore(this.store, { storage: AsyncStorage });
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad((resultCode) => {
        console.log(resultCode);
      });
      JPushModule.addReceiveNotificationListener((map) => {
        console.log(map);
      });
      JPushModule.addReceiveOpenNotificationListener((map) => {
        console.log(map);
      });
      JPushModule.getInfo((map) => {
        this.setState({
          myVersion: map.myVersion.slice(9),
        });
      });
    } else {
      JPushModule.setLocalNotification(234341234242424243, '2342342342342432423', 5, 'dfsa', 'dfaas', null, null);
      NativeAppEventEmitter.addListener('networkDidSetup', (token) => {
        console.log(token);
      });
      NativeAppEventEmitter.addListener('networkDidClose', (token) => {
        console.log(token);
      });
      NativeAppEventEmitter.addListener('networkDidRegister', (token) => {
        console.log(token);
      });
      NativeAppEventEmitter.addListener('networkDidLogin', (token) => {
        console.log(token);
      });
      NativeAppEventEmitter.addListener('ReceiveNotification',
        notification => console.log(notification));
    }
    JPushModule.getRegistrationID((registrationId) => {
      console.log(registrationId);
      this.setState({ cid: registrationId });
    });
    global.storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
    });
  }
  store = createStore(
    AppReducer,
    compose(
    applyMiddleware(
      thunk,
    ),
  ), autoRehydrate());
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;
