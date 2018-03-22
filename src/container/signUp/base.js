import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetMemberInfoService, CreateEnterForService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        title: '姓名',
        label: '',
      }, {
        title: '手机',
        label: '',
      }],
      topList: ['我要报名', '签订协议', '实地考察', '审核结果'],
      name: '',
      phone: '',
      myAdress: '',
      goodsName: '',
      provinceCode: '',
      cityCode: '',
      districtCode: '',
      categoryId: '',
      type: '',
    };
  }
  getInit = () => {
    const { type } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '',
      type,
    }, this.getData);
  }
  getData = () => {
    const { memberId, list } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < list.length; i += 1) {
          list[0].label = result.nickName;
          list[1].label = result.phone;
        }
        this.setState({
          userInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  getDelete = () => {
    this.EmitgetAddress.remove();
    this.EmitgetGoodsType.remove();
  }
  signUpEmit = (data) => {
    this.setState({
      provinceCode: data.sendProvinceCode,
      cityCode: data.sendCityCode,
      districtCode: data.sendDistrictCode,
      myAdress: data.text,
    });
  }
  signUpGetGoodsTypeEmit = (data) => {
    this.setState({
      goodsName: data.name,
      categoryId: data.categoryId,
    });
  }
  initData = () => { // 添加省份方法
    this.EmitgetAddress = DeviceEventEmitter.addListener('signUpEmit', (data) => {
      this.signUpEmit(data);
    });
    this.EmitgetGoodsType = DeviceEventEmitter.addListener('signUpGetGoodsTypeEmit', (data) => {
      this.signUpGetGoodsTypeEmit(data);
    });
  }
  saveName = (name) => {
    const { list } = this.state;
    list[0].label = name;
    this.setState({
      list,
    });
  }
  savePhone = (phone) => {
    const { list } = this.state;
    list[1].label = phone;
    this.setState({
      list,
    });
  }
  saveInfo = (value, index) => {
    console.log(index);
    switch (index) {
      case 0:
        this.saveName(value);
        break;
      case 1:
        this.savePhone(value);
        break;
      default:
    }
  }
  sumit = () => {
    const {
      list,
      categoryId,
      provinceCode,
      cityCode,
      districtCode,
      type,
      memberId } = this.state;
    if (!list[0].label) {
      Toast.show('请填写姓名');
      return;
    }
    if (!list[1].label) {
      Toast.show('请填写手机号');
      return;
    }
    const telReg = !(list[1].label).match(/^[1][3,4,5,6,7,8,9][0-9]{9}$/);
    if (telReg) {
      Toast.show('手机号格式不对');
      return;
    }
    if (!cityCode) {
      Toast.show('请选择地址');
      return;
    }
    if (!categoryId) {
      Toast.show('请选择品类');
      return;
    }
    this.sleek.toggle();
    CreateEnterForService({
      memberId,
      name: list[0].label,
      phone: list[1].label,
      categoryId,
      provinceCode,
      cityCode,
      districtCode,
      type,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        Toast.show('您的报名信息已提交！');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
