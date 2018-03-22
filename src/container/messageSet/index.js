import React from 'react';
import { View, BackHandler, Platform, DeviceEventEmitter, AppState } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import RNAndroidNotificationPermission from 'react-native-android-notification-permission';
import { Container, Text, Content, Switch } from 'native-base';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import { observer } from 'mobx-react/native';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, UserSocket } from '../../components';
import { SetMemberAnIsPushService } from '../../api';
import styles from './styles';

@observer
class MessageSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    AppState.addEventListener('change', this.appStateChange);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    AppState.removeEventListener('change', this.appStateChange);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  getInit = () => {
    if (Platform.OS === 'android') { // 如果是android平台
      this._checkAndroidNotificationPermission();
      return;
    }
    this.setState({
      isStart: global.reqNotification !== undefined && global.reqNotification !== 'denied',
    });
  }
  appStateChange = (appState) => {
    if (Platform.OS === 'android' && appState === 'background') {
      this.getInit();
    }
  }
  _checkAndroidNotificationPermission = async () => {
    const permissions = await RNAndroidNotificationPermission.checkNoticficationPermission();
    this.setState({
      isStart: permissions,
    });
  }
  changeStart = (val) => {
    if (Platform.OS === 'android') { // 如果是android平台
      this.setState({
        isStart: val,
      });
      return;
    }
    this._openSettings();
    // this.permiss();
  }
  permiss = () => {
    const types = Permissions.getTypes();
    console.log(types);
    if (types.join('').indexOf('notification') > -1) {
      Permissions.request('notification').then((response) => {
        this.setState({
          isStart: response && response !== 'denied',
        });
        global.reqNotification = response;
      });
    }
  }
  SetMemberAnIsPushService = () => {
    const { isStart } = this.state;
    this.sleek.toggle();
    SetMemberAnIsPushService({
      memberId: global.memberId,
      anIsPush: isStart ? '1' : '0',
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        DeviceEventEmitter.emit('emitUser');
        Toast.show(isStart ? '已开启消息通知' : '已关闭消息通知');
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  _openSettings = () => Permissions.openSettings().then(() => {
    this.permiss();
  })
  render() {
    const { pop } = this.props;
    const { isStart } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="通知设置"
        />
        <Content>
          <View style={styles.list}>
            <Text style={styles.name}>通知设置</Text>
            <View style={styles.right}>
              {/* <Switch
                value={isStart}
                onValueChange={val => this.changeStart(val)}
              /> */}
              <Text style={{ fontSize: 14, color: '#666' }}>{isStart ? '已开启' : '已关闭'}</Text>
            </View>
          </View>
          {
            Platform.OS === 'android' ?
              <View style={styles.androidBox}>
                <Text style={styles.androidText}>
                  如果您要关闭或者开启手机慧包网的新消息通知，请在手机的“设置” - “应用管理”功能中，找到应用程序‘手机慧包’更改
                </Text>
              </View>
            :
              <View style={styles.androidBox}>
                <Text style={styles.androidText}>
                  如果您要关闭或者开启手机慧包网的新消息通知，请在手机的“设置” - “应用管理”功能中，找到应用程序‘手机慧包’更改
                </Text>
              </View>
          }
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MessageSet.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MessageSet);
