import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetCodeService, AddOrUpdateReceiveAddressService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '15766665555',
      sendPhone: '15766665555',
      sec: 60,
      code: '1111',
      codeVal: '1111',
      addressTitle: '',
      fullAddress: '',
      postalCode: '',
      receiveProvinceCode: '',
      receiveCityCode: '',
      receiveDistrictCode: '',
      name: '',
      addressId: '',
      isDefault: [1],
    };
  }
  getInit = () => {
    this.emitArea = DeviceEventEmitter.addListener('emitArea', (data) => {
      const {
        text,
        sendProvinceCode,
        sendCityCode,
        sendDistrictCode,
      } = data;
      this.setState({
        addressTitle: text,
        receiveProvinceCode: sendProvinceCode,
        receiveCityCode: sendCityCode,
        receiveDistrictCode: sendDistrictCode,
      });
    });
    const { item } = this.props.navigation.state.params;
    if (item) {
      const {
        phone,
        fullAddress,
        name,
        postalCode,
        receiveProvinceCode,
        receiveCityCode,
        receiveDistrictCode,
        receiveProvinceName,
        receiveCityName,
        receiveDistrictName,
        receiveAddressId,
      } = item;
      this.setState({
        phone,
        fullAddress,
        name,
        postalCode,
        receiveProvinceCode,
        receiveCityCode,
        receiveDistrictCode,
        addressTitle: `${receiveProvinceName}${receiveCityName}${receiveDistrictName}`,
        receiveAddressId,
      });
    }
  }
  backCheck = (isDefault) => {
    this.setState({
      isDefault,
    });
  }
  deleteInit = () => {
    this.emitArea.remove();
  }
  sendCode = () => {
    if (this.isSend) {
      return;
    }
    const { phone } = this.state;
    if (!phone) {
      Toast.show('请输入手机号');
      return;
    }
    const telReg = !(phone).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
    if (telReg) {
      Toast.show('手机号格式不对');
      return;
    }
    if (this.isSend) {
      return;
    }
    this.isSend = true;
    const actionMethod = () => {
      const { sec } = this.state;
      if (sec <= 0) {
        clearInterval(this.timer);
        this.isSend = false;
        this.setState({
          sec,
        });
      } else {
        this.setState({
          sec: sec - 1,
        });
      }
    };
    this.sleek.toggle();
    GetCodeService({
      phone,
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          codeVal: res.data,
          sendPhone: phone,
        });
        actionMethod();
        this.timer = setInterval(
          () => {
            actionMethod();
          }, 1000);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  AddOrUpdateReceiveAddressService = () => {
    const {
      fullAddress,
      name,
      phone,
      postalCode,
      receiveProvinceCode,
      receiveCityCode,
      receiveDistrictCode,
      code,
      sendPhone,
      codeVal,
      receiveAddressId,
     } = this.state;
    if (!fullAddress || !receiveProvinceCode || !phone || !code) {
      Toast.show('信息不全');
      return;
    }
    if (name.length < 2 || name.length > 8) {
      Toast.show('姓名长度2-8');
      return;
    }
    if (phone !== sendPhone) {
      Toast.show('手机号与发送短信手机号不一致');
      return;
    }
    if (code !== codeVal) {
      Toast.show('验证码错误');
      return;
    }
    this.sleek.toggle();
    const receiveAddress = {
      memberId: global.memberId,
      receiveAddressId: receiveAddressId || '',
      receiveProvinceCode,
      receiveCityCode,
      receiveDistrictCode,
      fullAddress,
      name,
      phone,
      postalCode,
    };
    AddOrUpdateReceiveAddressService({
      receiveAddress: JSON.stringify(receiveAddress),
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitLoad');
        DeviceEventEmitter.emit('getEmitAdress');
        this.props.pop();
      } else {
        Toast.show(res.msg);
        this.props.pop();
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
