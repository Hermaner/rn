import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { AddOrUpdateReceiveAddressService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      fullAddress: '', // 详细地址
      name: '', // 收货人姓名
      phone: '', // 收货人手机号
      postalCode: '', // 邮编
      refresh: false, // 是否是刷新
      // receiveAddressId: '', // 收货地址id
      receiveProvinceCode: '',
      receiveCityCode: '',
      receiveDistrictCode: '',
      pageSize: '5',
      myAdress: '',
    };
  }
  getAddressEmit = (data) => {
    console.log(data);
    this.setState({
      receiveProvinceCode: data.sendProvinceCode,
      receiveCityCode: data.sendCityCode,
      receiveDistrictCode: data.sendDistrictCode,
      myAdress: data.text,
    });
  }
  initData = () => { // 添加省份方法
    this.EmitgetAddress = DeviceEventEmitter.addListener('getAddressEmit', (data) => {
      this.getAddressEmit(data);
    });
    const { adress } = this.props.navigation.state.params;
    this.setState({
      myAdress: adress,
    });
  }
  deleteData = () => {
    this.EmitgetAddress.remove();
  }
  saveName = (value) => {
    this.setState({
      name: value,
    });
  }
  saveFullAddress = (value) => {
    this.setState({
      fullAddress: value,
    });
  }
  savePhone = (value) => {
    this.setState({
      phone: value,
    });
  }
  savePostalCode = (value) => {
    this.setState({
      postalCode: value,
    });
  }
  addAdress = () => {
    const { push } = this.props;
    const { getAdressId } = this.props.navigation.state.params;
    const {
      fullAddress,
      name,
      phone,
      postalCode,
      receiveProvinceCode,
      receiveCityCode,
      receiveDistrictCode,
      refresh,
      ds,
      pageSize,
      dataSource,
      items } = this.state;
    if (!receiveCityCode) {
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
    if (!name) {
      Alert.alert(
        '提交失败',
        '请填写详姓名',
      );
      return;
    }
    if (!phone) {
      Alert.alert(
        '提交失败',
        '请填写手机号码',
      );
      return;
    }
    const reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (!reg.test(phone)) {
      Alert.alert(
        '提交失败',
        '手机格式不正确',
      );
      return;
    }
    if (!postalCode) {
      Alert.alert(
        '提交失败',
        '请填写邮政编码',
      );
      return;
    }
    const receiveAddress = {
      'memberId': '1',
      'receiveAddressId': getAdressId,
      'receiveProvinceCode': receiveProvinceCode,
      'receiveCityCode': receiveCityCode,
      'receiveDistrictCode': receiveDistrictCode,
      'fullAddress': fullAddress,
      'name': name,
      'phone': phone,
      'postalCode': postalCode,
    }
    this.sleek.toggle();
    AddOrUpdateReceiveAddressService({
      receiveAddress: JSON.stringify(receiveAddress),
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
        push({ key: 'ShippingAddress' });
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
