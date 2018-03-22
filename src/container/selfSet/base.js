import React from 'react';
import { AsyncStorage, DeviceEventEmitter, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { UserSocket } from '../../components';
import { GetMemberInfoService } from '../../api';

class SelfSetBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      isSet: false,
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const { memberId } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        const province = result.provinceCode;
        const city = result.cityCode;
        const district = result.districtCode;
        const isHave = province && city && district ? 1 : 0;
        this.setState({
          userInfo: result,
          isSet: isHave,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
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
            UserSocket.changeData({});
            UserSocket.changeCount({});
            DeviceEventEmitter.emit('emitUser');
            this.props.pop();
          } },
      ],
    );
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
}
SelfSetBase.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
};
export default SelfSetBase;
