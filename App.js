import React from 'react';
import { AppRegistry, AsyncStorage, Platform, NativeAppEventEmitter, DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions';
import JPushModule from 'jpush-react-native';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { observer } from 'mobx-react/native';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers';
import { UserSocket } from './src/components';
import AppWithNavigationState from './src/navigators/AppNavigator';


@observer
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    persistStore(this.store, { storage: AsyncStorage });
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad(() => {});
      JPushModule.addReceiveNotificationListener(() => {
        // DeviceEventEmitter.emit('pushHome', {
        //   key: 'NotificationSystem',
        // });
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
      global.registration = registrationId;
    });
    this.premInit();
    // AsyncStorage.removeItem('userData');
    AsyncStorage.getItem('userData', (error, res) => {
      if (res) {
        global.userData = JSON.parse(res);
        UserSocket.changeData(global.userData);
        global.memberId = JSON.parse(res).memberId;
        console.log(global.userData);
      }
    });
    AsyncStorage.getItem('searchHistorys', (error, res) => {
      if (res) {
        global.searchHistorys = JSON.parse(res);
      }
    });
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
