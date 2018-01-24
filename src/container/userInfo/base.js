import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetIdentityService, UpdateMemberInfoService } from '../../api';

class UserInfoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '', // 详细地址
      name: '', // 收货人名字
      refresh: false, // 是否是刷新
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      pageSize: '5',
      myAdress: '',
    };
  }
  getInit = () => {
    this.GetIdentityService();
    this.setState({
      memberId: global.userData.memberId,
      nickName: global.userData.nickName,
      phone: global.userData.phone,
    });
  }
  userInfoEmit = (data) => {
    console.log(data);
    this.setState({
      provinceCode: data.sendProvinceCode,
      cityCode: data.sendCityCode,
      districtCode: data.sendDistrictCode,
      myAdress: data.text,
    });
  }
  initData = () => { // 添加省份方法
    this.EmitgetAddress = DeviceEventEmitter.addListener('userInfoEmit', (data) => {
      this.userInfoEmit(data);
    });
  }
  saveFullAddress = (value) => {
    this.setState({
      fullAddress: value,
    });
    if (this.state.address.length > 30) {
      Alert.alert(
        '字数超出限制',
      );
    }
  }
  saveName = (value) => {
    this.setState({
      name: value,
    });
  }
  GetIdentityService = () => {
    GetIdentityService()
    .then((res) => {
      this.setState({
        items: res.data,
      });
    });
  }
  reviseUserInfo = () => {
    const { push } = this.props;
    const {
      fullAddress,
      name,
      provinceCode,
      cityCode,
      districtCode,
      memberId } = this.state;
    if (!cityCode) {
      Alert.alert(
        '提交失败',
        '请选择地址',
      );
      return;
    }
    if (!fullAddress) {
      Alert.alert(
        '提交失败',
        '请填写详细地址',
      );
      return;
    }
    const member = {
      memberId,
      provinceCode,
      cityCode,
      districtCode,
      address: fullAddress,
      nickName: name,
    };
    this.sleek.toggle();
    UpdateMemberInfoService({
      member: JSON.stringify(member),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        push({ key: 'SelfSet' });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      console.log(err);
    });
  }
}
UserInfoBase.propTypes = {
  push: PropTypes.func,
};
export default UserInfoBase;
