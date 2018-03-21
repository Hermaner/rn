import React from 'react';
import { AsyncStorage, Alert, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { UserSocket } from '../../components';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        name: '个人信息',
        page: 'MemberInfo',
      }, {
        name: '我的实名',
        page: 'MemberInfo',
      }, {
        name: '我的收货地址',
        page: 'MyAddress',
      }, {
        name: '通知设置',
        page: 'NoticeSetting',
      }],
    };
  }
  logOut = () => {
    Alert.alert(
      '温馨提示', '确认退出',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            AsyncStorage.removeItem('userData');
            global.userData = null;
            global.memberId = null;
            global.masterId = null;
            DeviceEventEmitter.emit('offSessionEmit');
            UserSocket.changeData({});
            UserSocket.changeApply({});
            this.props.pop();
          } },
      ],
    );
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
