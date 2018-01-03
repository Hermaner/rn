import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetIdentityService, UpdateMemberInfoService } from '../../api';

let canEnd = false;
class UserInfoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullAddress: '', // 详细地址
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
    global.storage.load({
      key: 'userData',
    }).then((ret) => {
      console.log(ret);
      global.memberId = ret.memberId;
      this.setState({
        memberId: ret.memberId,
        userName: ret.userName,
        phone: ret.phone,
      });
    }).catch(() => {
      console.log('没有用户数据');
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
    if (this.state.fullAddress.length > 30) {
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
    const {
      fullAddress,
      name,
      provinceCode,
      cityCode,
      districtCode,
      refresh,
      ds,
      pageSize,
      dataSource,
      items } = this.state;
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
      'memberId': '1',
      'provinceCode': provinceCode,
      'cityCode': cityCode,
      'districtCode': districtCode,
      'fullAddress': fullAddress,
      'name': name,
    }
    this.sleek.toggle();
    UpdateMemberInfoService({
      member: JSON.stringify(member),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (refresh) {
          this.setState({
            items: result,
            dataSource: ds.cloneWithRows(result),
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            dataSource: dataSource.cloneWithRows(newItems),
            loading: false,
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
}
export default UserInfoBase;
