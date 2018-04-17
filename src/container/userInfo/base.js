import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { UserSocket } from '../../components';
import { GetIdentityService, UpdateMemberInfoService } from '../../api';

@observer
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
      licenseImg: '',
      licenseImgUrl: '',
    };
  }
  getInit = () => {
    this.GetIdentityService();
    this.setState({
      memberId: UserSocket.userData.memberId,
      nickName: UserSocket.userData.nickName,
      phone: UserSocket.userData.phone,
    });
  }
  getImages1 = (upImages) => {
    this.setState({
      licenseImg: upImages[upImages.length - 1].uri,
      licenseImgUrl: upImages[upImages.length - 1].key,
    });
  }
  userInfoEmit = (data) => {
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
      // fullAddress,
      name,
      provinceCode,
      cityCode,
      districtCode,
      memberId } = this.state;
    // if (!cityCode) {
    //   Alert.alert(
    //     '提交失败',
    //     '请选择地址',
    //   );
    //   return;
    // }
    // if (!fullAddress) {
    //   Alert.alert(
    //     '提交失败',
    //     '请填写详细地址',
    //   );
    //   return;
    // }
    const member = {
      memberId,
      provinceCode,
      cityCode,
      districtCode,
      // address: fullAddress,
      nickName: name,
    };
    this.sleek.toggle();
    UpdateMemberInfoService({
      member: JSON.stringify(member),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        UserSocket.changeData(res.data);
        DeviceEventEmitter.emit('emitUser');
        push({ key: 'SelfSet' });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
UserInfoBase.propTypes = {
  push: PropTypes.func,
};
export default UserInfoBase;
