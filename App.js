import React from 'react';
import { BackHandler, AppRegistry, AsyncStorage, Platform, NativeAppEventEmitter, DeviceEventEmitter, AppState } from 'react-native';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions';
import JPushModule from 'jpush-react-native';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import * as WeChat from 'react-native-wechat';
import { observer } from 'mobx-react/native';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers';
import { UserSocket, SocketObser } from './src/components';
import AppWithNavigationState from './src/navigators/AppNavigator';


@observer
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    persistStore(this.store, { storage: AsyncStorage });
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad(() => {});
      JPushModule.addReceiveNotificationListener(() => {
      });
      JPushModule.addReceiveOpenNotificationListener((map) => {
        const { type } = JSON.parse(map.extras);
        if (type === '1') {
          DeviceEventEmitter.emit('pushHome', {
            key: global.memberId ? 'NotificationSystem' : 'User',
          });
        }
      });
      JPushModule.getInfo((map) => {
        this.setState({
          myVersion: map.myVersion.slice(9),
        });
      });
    } else {
      NativeAppEventEmitter.addListener('networkDidLogin', () => {
        JPushModule.getRegistrationID((registrationId) => {
          if (registrationId) {
            global.registration = registrationId;
          }
        });
      });
    }
    JPushModule.getRegistrationID((registrationId) => {
      if (registrationId) {
        global.registration = registrationId;
      }
    });
    AppState.addEventListener('change', (appState) => {
      if (appState === 'active') {
        this.clearIosBadge();
      }
    });
    this.clearIosBadge();
    WeChat.registerApp('wx3b280438f5c9f74c');
    this.premInit();
    // AsyncStorage.removeItem('userData');
    AsyncStorage.getItem('userData', (error, res) => {
      if (res) {
        global.userData = JSON.parse(res);
        UserSocket.changeData(global.userData);
        global.memberId = JSON.parse(res).memberId;
        // console.log(global.userData);
        SocketObser.getConnect();
      }
    });
    AsyncStorage.getItem('searchHistorys', (error, res) => {
      if (res) {
        global.searchHistorys = JSON.parse(res);
      }
    });
    global.Toast = Toast;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
      return false;
    }
    this.lastBackPressed = Date.now();
    Toast.show('再按一次退出应用');
    return true;
  };
  clearIosBadge = () => {
    if (Platform.OS === 'ios') {
      JPushModule.setBadge(0, () => {});
    }
  }
  premInit = () => {
    const types = Permissions.getTypes();
    const canOpenSettings = Permissions.canOpenSettings();
    this.setState({ types, canOpenSettings });
    Permissions.request('location').then((response) => {
      // console.log(response)
      global.reqLocation = response;
    });
    if (types.join('').indexOf('notification') > -1) {
      Permissions.request('notification').then((response) => {
        // console.log(response)
        global.reqNotification = response;
      });
    }
    // Permissions.request('camera').then((response) => {
    //   console.log(response)
    //   global.reqCamera = response;
    // });
    // Permissions.request('photo').then((response) => {
    //   console.log(response)
    //   global.reqPhoto = response;
    // });
    // this._checkAndroidNotificationPermission();
    // this._openSettings();
  }
  _openSettings = () => Permissions.openSettings().then(() => {})
  store = createStore(
    AppReducer,
    applyMiddleware(
      createReactNavigationReduxMiddleware(
        'root',
        state => state.nav,
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
