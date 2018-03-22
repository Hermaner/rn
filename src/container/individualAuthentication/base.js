import React from 'react';
import Toast from 'react-native-simple-toast';
import { PersonVerifService, GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
      userName: '',
      userCredentials: '',
      zheng: require('../../assets/img/3531519719863_.pic.png'),
      fan: require('../../assets/img/3531519719863_.pic1.png'),
      take: require('../../assets/img/3531519719863_.pic2.png'),
      frontImgUrl: '',
      backImgUrl: '',
      takeCardImgUrl: '',
      status: '', // 用户认证状态
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const { memberId } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        console.log(result);
        const province = result.provinceCode;
        const city = result.cityCode;
        const district = result.districtCode;
        const isHave = province && city && district ? 'true' : 'false';
        const status = result.personVerifStatus;
        this.setState({
          userInfo: result,
          isSet: isHave,
          personVerifs: result.personVerifs,
          status,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  getImages1 = (upImages) => {
    this.setState({
      frontImgUrl: upImages,
    });
  }
  getImages2 = (upImages) => {
    this.setState({
      backImgUrl: upImages,
    });
  }
  getImages3 = (upImages) => {
    this.setState({
      takeCardImgUrl: upImages,
    });
  }
  saveUserName = (value) => {
    this.setState({
      userName: value,
    });
    console.log(this.state.userName);
  }
  saveUserCredentials = (value) => {
    this.setState({
      userCredentials: value,
    });
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
  choosePlace = (value) => {
    this.setState({
      selected2: value,
    });
  }
  submit = () => {
    const {
      userName,
      userCredentials,
      memberId,
      frontImgUrl,
      backImgUrl,
      takeCardImgUrl,
      personVerifs } = this.state;
    if (personVerifs.length >= 1) {
      Toast.show('请不要重复验证');
      return;
    }
    if (userName === '' || userCredentials === '') {
      Toast.show('请填写姓名和身份证号');
      return;
    }
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(userCredentials)) {
      Toast.show('身份证号格式不正确');
      return;
    }
    if (frontImgUrl === '') {
      Toast.show('请上传身份证正面照');
      return;
    }
    if (backImgUrl === '') {
      Toast.show('请上传身份证反面照');
      return;
    }
    if (takeCardImgUrl === '') {
      Toast.show('请上传手持身份证正面半身照');
      return;
    }
    const personVerif = {
      memberId,
      realName: userName,
      idCard: userCredentials,
      frontImgUrl: frontImgUrl[frontImgUrl.length - 1].key,
      backImgUrl: backImgUrl[backImgUrl.length - 1].key,
      takeCardImgUrl: takeCardImgUrl[takeCardImgUrl.length - 1].key,
    };
    this.sleek.toggle();
    PersonVerifService({
      personVerif: JSON.stringify(personVerif),
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        Toast.show('个人认证信息已上传，请等待认证');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
}
export default Base;
