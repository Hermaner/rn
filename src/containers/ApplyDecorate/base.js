import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCodeService, AuthDecorationService } from '../../api';

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
      upImages: [],
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      districtId: '',
      districtName: '',
      addressTitle: '',
      decorationName: '',
      address: '',
      detail: '',
      contacts: '',
    };
  }
  getInit = () => {
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
  getImages = (upImages) => {
    console.log(upImages);
    this.setState({
      upImages,
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
  AuthDecorationService = () => {
    const {
      address,
      detail,
      businessHours,
      provinceId,
      provinceName,
      cityId,
      cityName,
      districtId,
      addressTitle,
      districtName,
      upImages,
      sendPhone,
      contacts,
      phone,
      code,
      codeVal,
      decorationName,
    } = this.state;
    if (decorationName.length < 4) {
      Toast.show('店铺名称至少4字');
      return;
    }
    if (upImages.length < 2) {
      Toast.show('至少上传2张店铺图片');
      return;
    }
    if (address.length < 4) {
      Toast.show('详细地址至少4字');
      return;
    }
    if (detail.length < 10) {
      Toast.show('店铺介绍至少10字');
      return;
    }
    if (businessHours.length < 6) {
      Toast.show('营业时间至少6字');
      return;
    }
    if (!addressTitle) {
      Toast.show('请选择省市区');
      return;
    }
    if (!code) {
      Toast.show('请输入验证码');
      return;
    }
    if (!contacts) {
      Toast.show('请输入联系人');
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
    AuthDecorationService({
      address,
      decorationImages: upImages.map(item => item.key).join(','),
      imgUrl: '',
      contacts,
      detail,
      phone,
      businessHours,
      decorationName,
      provinceId,
      provinceName,
      cityId,
      cityName,
      districtId,
      districtName,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('申请成功，请等待审核短信通知');
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
};
export default Base;
