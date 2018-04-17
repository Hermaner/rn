import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { AddOrUpdateReceiveAddressService } from '../../api';

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
      memberId: global.memberId || '',
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
      memberId,
     } = this.state;
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
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
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
      memberId,
      receiveAddressId: getAdressId,
      receiveProvinceCode,
      receiveCityCode,
      receiveDistrictCode,
      fullAddress,
      name,
      phone,
      postalCode,
    };
    this.sleek.toggle();
    AddOrUpdateReceiveAddressService({
      receiveAddress: JSON.stringify(receiveAddress),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        // console.log(res);
        // let emit;
        // switch (type) {
        //   case 'getEmitAdress':
        //     emit = 'getEmitAdress';
        //     break;
        //   default:
        // }
        DeviceEventEmitter.emit('getEmitAdress');
        push({ key: 'ShippingAddress' });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
