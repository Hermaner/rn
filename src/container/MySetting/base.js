import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { UserSocket } from '../../components';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        name: '清理缓存',
        page: '',
      }, {
        name: '服务条款与协议',
        page: 'ClauseAndAgreement',
      }, {
        name: '关于我们',
        page: 'AboutUs',
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
            UserSocket.changeData({});
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
