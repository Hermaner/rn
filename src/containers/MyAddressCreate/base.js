import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { GetCodeService, UpdateMemberAddressService, CreateMemberAddressService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '',
      sendPhone: '',
      sec: 60,
      code: '',
      codeVal: '',
      addressTitle: '',
      address: '',
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      districtId: '',
      districtName: '',
      nickName: '',
      addressId: '',
      isDefault: [1],
    };
  }
  getInit = () => {
    const { params } = this.props.navigation.state;
    if (params) {
      const { item, type } = params;
      if (type) {
        this.setState({
          type,
        });
        return;
      }
      const {
        phone,
        provinceId,
        provinceName,
        cityId,
        cityName,
        districtId,
        districtName,
        address,
        nickName,
        addressId,
        isDefault,
      } = item;
      this.setState({
        phone,
        provinceId,
        provinceName,
        cityId,
        cityName,
        districtId,
        districtName,
        addressTitle: `${provinceName}${cityName}${districtName}`,
        address,
        nickName,
        addressId,
        isDefault: isDefault === 1 ? [1] : [],
      });
    }
    this.emitArea = DeviceEventEmitter.addListener('emitArea', (data) => {
      console.log(data);
      const {
        addressTitle,
        provinceId,
        provinceName,
        cityId,
        cityName,
        districtId,
        districtName,
      } = data;
      this.setState({
        addressTitle,
        provinceId,
        provinceName,
        cityId,
        cityName,
        districtId,
        districtName,
      });
    });
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
    const { phone } = this.state;
    if (!phone) {
      Toast.show('请输入手机号');
      return;
    }
    const telReg = !(phone).match(/^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/);
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
      console.log(res);
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
  CreateOtherOrgService = () => {
    const {
      address,
      codeVal,
      sendPhone,
      phone,
      code,
      provinceId,
      provinceName,
      cityId,
      cityName,
      districtId,
      districtName,
      nickName,
      addressId,
      isDefault,
    } = this.state;
    if (!address || !provinceId || !phone || !code || !phone) {
      Toast.show('信息不全');
      return;
    }
    if (nickName.length < 2 || nickName.length > 8) {
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
    const targetFn = addressId ? UpdateMemberAddressService : CreateMemberAddressService;
    this.sleek.toggle();
    targetFn({
      address,
      provinceId,
      provinceName,
      cityId,
      cityName,
      districtId,
      districtName,
      nickName,
      phone,
      addressId,
      isDefault: isDefault.length > 0 ? '1' : '0',
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
        this.props.pop();
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
