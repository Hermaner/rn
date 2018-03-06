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
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import { UserSocket } from './src/components';
import SocketStore from './src/components/socket/SocketStore';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { GetMemberCenterService } from './src/api';

@observer
class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    persistStore(this.store, { storage: AsyncStorage });
    if (Platform.OS === 'android') {
      JPushModule.notifyJSDidLoad(() => {});
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
      global.registration = registrationId || 'ios';
    });
    this.premInit();
    global.socketStore = new SocketStore();
    AsyncStorage.getItem('userData', (error, res) => {
      if (res) {
        const userData = JSON.parse(res);
        UserSocket.changeData(userData);
        console.log(userData);
        global.memberId = userData.memberId;
        this.GetMemberCenterService();
        global.socketStore.getConnect();
        DeviceEventEmitter.emit('emitSession');
      }
    });
    AsyncStorage.getItem('searchHistorys', (error, res) => {
      if (res) {
        global.searchHistorys = JSON.parse(res);
      }
    });
    DeviceEventEmitter.addListener('socketConnet', () => {
      global.socketStore.getConnect();
    });
    DeviceEventEmitter.addListener('emitMine', () => {
      this.GetMemberCenterService();
    });
  }
  premInit = () => {
    const types = Permissions.getTypes();
    const canOpenSettings = Permissions.canOpenSettings();
    this.setState({ types, canOpenSettings });
    Permissions.request('location').then((response) => {
      console.log(response);
      global.reqLocation = response;
    });
    if (types.join('').indexOf('notification') > -1) {
      Permissions.request('notification').then((response) => {
        console.log(response);
        global.reqNotification = response;
      });
    }
    Permissions.request('camera').then((response) => {
      console.log(response);
      global.reqCamera = response;
    });
    Permissions.request('photo').then((response) => {
      console.log(response);
      global.reqPhoto = response;
    });
    // this._openSettings();
  }
  GetMemberCenterService = () => {
    const { memberId } = global;
    if (!memberId) {
      return;
    }
    GetMemberCenterService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const {
          balance,
          demandCount,
          waitePayCount,
          waiteServiceCount,
          waiteEvaluateCount,
          bmMarketInfo,
          couponCount,
          decorationInfo,
          depositOrderMaster,
          masterInfo,
        } = res.data;
        const applyData = [];
        let applyInfo = {};
        if (bmMarketInfo) {
          if (bmMarketInfo.checkStatus === 4) {
            global.bmMarketId = bmMarketInfo.bmMarketId;
            applyInfo.bmMarketId = bmMarketInfo.bmMarketId;
          } else {
            applyData.push({
              status: bmMarketInfo.checkStatus,
              name: '建材市场入驻申请',
              memo: bmMarketInfo.checkMemo,
              id: '1',
            });
          }
        }
        if (decorationInfo) {
          if (decorationInfo.checkStatus === 4) {
            global.decorationId = decorationInfo.decorationId;
            applyInfo.decorationId = decorationInfo.decorationId;
          } else {
            applyData.push({
              status: decorationInfo.checkStatus,
              name: '装修公司入驻申请',
              memo: decorationInfo.checkMemo,
              id: '2',
            });
          }
        }
        if (masterInfo) {
          if (masterInfo.checkStatus === 4) {
            applyInfo.masterId = masterInfo.masterId;
            global.masterId = masterInfo.masterId;
          } else {
            applyData.push({
              status: masterInfo.checkStatus,
              name: '师傅入驻申请',
              memo: masterInfo.checkMemo,
              id: '3',
            });
          }
        }
        applyInfo = {
          ...applyInfo,
          applyData,
          couponCount,
          balance,
          demandCount,
          waitePayCount,
          waiteServiceCount,
          waiteEvaluateCount,
        };
        UserSocket.changeApply(applyInfo);
        global.depositOrderMaster = depositOrderMaster;
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  _openSettings = () => Permissions.openSettings().then(() => {})
  store = createStore(
    AppReducer,
    applyMiddleware(createReactNavigationReduxMiddleware(
      'root',
      state => state.nav,
    )), autoRehydrate());
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
