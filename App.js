import React from 'react';
import { AppRegistry, AsyncStorage, Platform, NativeAppEventEmitter, DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions';
import JPushModule from 'jpush-react-native';
import { observer } from 'mobx-react/native';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import SocketStore from './src/components/socket/SocketStore';
import AppWithNavigationState from './src/navigators/AppNavigator';

@observer
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    persistStore(this.store, { storage: AsyncStorage });
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad(() => {
        // console.log(resultCode);
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
      console.log(registrationId);
      this.setState({ cid: registrationId });
    });
    this.premInit();
    global.socketStore = new SocketStore();
    AsyncStorage.getItem('userData', (error, res) => {
      if (res) {
        // global.userData = JSON.parse(res);
        // global.memberId = JSON.parse(res).memberId;
      }
      global.socketStore.getConnect();
      DeviceEventEmitter.emit('emitSession');
    });
    DeviceEventEmitter.addListener('socketConnet', () => {
      global.socketStore.getConnect();
    });
    global.memberId = '102';
    global.userData = {
      memberId: 102,
      userName: '%E4%B8%8A%E6%B5%B7%E7%BB%B4%E4%BF%AE%E7%96%8F%E9%80%9A15900653759',
      nickName: '%E4%B8%8A%E6%B5%B7%E7%BB%B4%E4%BF%AE%E7%96%8F%E9%80%9A15900653759',
      imgUrl: 'http://wx.qlogo.cn/mmopen/vi_32/UL8hfCvCibOwibiaBdGiaRLHeYeiaho4COaslyqtXTH8FwcDiat7mVdXB0ic82OxNTAOdh3Dg5Wx53nlXEo8V3wYWAGSg/132',
    };
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
