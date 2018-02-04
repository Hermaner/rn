import React from 'react';
import { Alert } from 'react-native';
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
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const { memberId } = this.state;
    console.log('rrrrrrrrr', memberId);
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        console.log('^^^^^^', result);
        const province = result.provinceCode;
        const city = result.cityCode;
        const district = result.districtCode;
        const isHave = province && city && district ? 'true' : 'false';
        this.setState({
          userInfo: result,
          isSet: isHave,
          personVerifs: result.personVerifs,
        });
      } else {
        Toast.show('温馨提示');
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
      Alert.alert(
        '请不要重复验证',
      );
      return;
    }
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(userCredentials)) {
      Alert.alert(
        '提交失败',
        '身份证号格式不正确',
      );
    }
    if (userName === '' || userCredentials === '') {
      Alert.alert(
        '提交失败',
        '请填写姓名和身份证号',
      );
    }
    if (frontImgUrl === '') {
      Alert.alert(
        '提交失败',
        '请上传身份证正面照',
      );
    }
    if (backImgUrl === '') {
      Alert.alert(
        '提交失败',
        '请上传身份证反面照',
      );
    }
    if (takeCardImgUrl === '') {
      Alert.alert(
        '提交失败',
        '请上传手持身份证正面半身照',
      );
    }
    const personVerif = {
      memberId,
      realName: userName,
      idCard: userCredentials,
      frontImgUrl: frontImgUrl[0].key,
      backImgUrl: backImgUrl[0].key,
      takeCardImgUrl: takeCardImgUrl[0].key,
    };
    console.log(personVerif);
    this.sleek.toggle();
    PersonVerifService({
      personVerif: JSON.stringify(personVerif),
    }).then((res) => {
      console.log('~~~', res);
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
      } else {
        Toast.show('温馨提示');
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
