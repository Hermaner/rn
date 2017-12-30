import React from 'react';
import { AppRegistry, AsyncStorage, Platform, NativeAppEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions';
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

import { Loading } from './src/components';
import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    WeChat.registerApp('wx26b5853e6e77d138');
    persistStore(this.store, { storage: AsyncStorage });
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad(() => {
        // console.log(resultCode);
      });
      JPushModule.addReceiveNotificationListener(() => {
        // console.log(map);
      });
      JPushModule.addReceiveOpenNotificationListener(() => {
        // console.log(map);
      });
      JPushModule.getInfo((map) => {
        this.setState({
          myVersion: map.myVersion.slice(9),
        });
      });
    } else {
      JPushModule.setLocalNotification(234341234242424243, '2342342342342432423', 5, 'dfsa', 'dfaas', null, null);
      NativeAppEventEmitter.addListener('networkDidSetup', () => {
        // console.log(token);
      });
      NativeAppEventEmitter.addListener('networkDidClose', () => {
        // console.log(token);
      });
      NativeAppEventEmitter.addListener('networkDidRegister', () => {
        // console.log(token);
      });
      NativeAppEventEmitter.addListener('networkDidLogin', () => {
        // console.log(token);
      });
      NativeAppEventEmitter.addListener('ReceiveNotification', () => {
        // console.log(notification)
      });
    }
    JPushModule.getRegistrationID((registrationId) => {
      // console.log(registrationId);
      this.setState({ cid: registrationId });
    });
    this.premInit();
    global.storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
    });
    global.storage.load({ key: 'userData' }).then((res) => { global.memberId = res.memberId; });
    global.Toast = Toast;
  }
  premInit = () => {
    const types = Permissions.getTypes();
    const canOpenSettings = Permissions.canOpenSettings();
    this.setState({ types, canOpenSettings });
    Permissions.request('location').then((response) => {
      console.log(response)
      global.reqLocation = response;
    });
    if (types.join('').indexOf('notification') > -1) {
      Permissions.request('notification').then((response) => {
        console.log(response)
        global.reqNotification = response;
      });
    }
    Permissions.request('camera').then((response) => {
      console.log(response)
      global.reqCamera = response;
    });
    Permissions.request('photo').then((response) => {
      console.log(response)
      global.reqPhoto = response;
    });
    // this._openSettings();
  }
  _openSettings = () => Permissions.openSettings().then(() => {})
  store = createStore(
    AppReducer,
    compose(
    applyMiddleware(
      thunk,
    ),
  ));
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
