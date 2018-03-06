import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCodeService, AuthMasterService, GetMasterTypeService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      phone: '15666666666',
      sendPhone: '15666666666',
      sec: 60,
      code: '1111',
      codeVal: '1111',
      upImages: [],
      ModalOpen: false,
      masterTypes: [],
      provinceId: '',
      provinceName: '',
      cityId: '',
      masterTypeCount: 0,
      cityName: '',
      districtId: '',
      districtName: '',
      addressTitle: '',
      address: '',
      detail: '',
      servicesDistrictIds: '',
      masterTypeIds: '',
      realName: '',
      identityCard: '',
    };
  }
  getInit = () => {
    this.GetMasterTypeService();
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
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
  tabTec = (index, i) => {
    const { masterTypes } = this.state;
    let { masterTypeCount } = this.state;
    const cur = masterTypes[index].childs[i].cur;
    if (cur) {
      masterTypeCount -= 1;
    } else {
      masterTypeCount += 1;
    }
    masterTypes[index].childs[i].cur = !cur;
    this.setState({
      masterTypes,
      masterTypeCount,
    });
  }
  GetMasterTypeService = () => {
    this.sleek.toggle();
    GetMasterTypeService().then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          masterTypes: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  AuthMasterService = () => {
    const {
      address,
      detail,
      provinceId,
      provinceName,
      cityId,
      cityName,
      districtId,
      addressTitle,
      districtName,
      upImages,
      sendPhone,
      realName,
      identityCard,
      phone,
      code,
      masterTypes,
      masterTypeCount,
    } = this.state;
    const masterTypeIds = [];
    masterTypes.forEach((item) => {
      if (item.childs) {
        item.childs.forEach((list) => {
          if (list.cur) {
            masterTypeIds.push(list.id);
          }
        });
      }
    });
    if (!realName
      || !identityCard || !phone || !code || !addressTitle || !detail || masterTypeCount === 0) {
      Toast.show('信息不全');
      return;
    }
    if (this.code !== this.codeVal) {
      Toast.show('验证码错误');
      return;
    }
    if (phone !== sendPhone) {
      Toast.show('手机号与发送短信手机号不一致');
      return;
    }
    if (upImages.length !== 3) {
      Toast.show('上传照片数量错误');
      return;
    }
    const idCardReg = !identityCard.match(/\d{17}[\d|x]|\d{15}/);
    if (idCardReg) {
      Toast.show('身份证号码格式不对');
      return;
    }
    this.sleek.toggle();
    AuthMasterService({
      phone,
      provinceId,
      provinceName,
      cityId,
      cityName,
      districtId,
      districtName,
      address,
      detail,
      servicesDistrictIds: '',
      masterSkills: '',
      masterTypeIds: masterTypeIds.join(','),
      realName,
      identityCard,
      firstImage: upImages[0].key,
      twoImage: upImages[1].key,
      threeImage: upImages[2].key,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('申请成功，请等待审核短信通知');
        this.props.pop();
      } else {
        Toast.show(res.msg);
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
