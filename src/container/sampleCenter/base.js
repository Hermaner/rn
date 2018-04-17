import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateApplyDemoService, GetDemoRoleService } from '../../api';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityList: [],
      backGround1: require('../../assets/img/1.png'),
      userInfo: '',
      needAmount: '',
      identity: '',
      supplyId: '',
      memberId: '',
      memo: '',
      demoRole: [],
    };
  }
  getInit = () => {
    const { supplyId } = this.props.navigation.state.params;
    this.setState({
      supplyId,
      memberId: global.memberId,
    }, this.getData);
  }
  getData = () => {
    const { identityList } = this.state;
    GetDemoRoleService({
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          identityList.push({
            title: result[i].name,
            isChoose: -1,
          });
        }
        this.setState({
          identityList,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  getImages1 = (upImages) => {
    this.setState({
      frontImgUrl: upImages,
    });
  }
  saveBuyCounts = (needAmount) => {
    this.setState({
      needAmount,
    });
  }
  saveMemo = (memo) => {
    this.setState({
      memo,
    });
  }
  chooseType = (index) => {
    const { identityList } = this.state;
    for (let i = 0; i < identityList.length; i += 1) {
      if (i === index) {
        identityList[i].isChoose *= -1;
        this.setState({
          identityList,
        });
      }
    }
  }
  CreateApplyDemoService =() => {
    const { memberId, supplyId, needAmount, identityList, memo, frontImgUrl } = this.state;
    const identityArray = [];
    const imgArray = [];
    for (let i = 0; i < identityList.length; i += 1) {
      if (identityList[i].isChoose === 1) {
        identityArray.push(identityList[i].title);
      }
    }
    for (let i = 0; i < frontImgUrl.length; i += 1) {
      imgArray.push(frontImgUrl[i].key);
    }
    if (!needAmount) {
      Toast.show('请填写每月的采购量！');
      return;
    }
    const reg = /^[1-9]*[1-9][0-9]*$/;
    if (!reg.test(needAmount)) {
      Toast.show('每月的采购量输入错误');
      return;
    }
    if (!identityArray) {
      Toast.show('请选择采购身份！');
      return;
    }
    if (!imgArray) {
      Toast.show('请上传身份示意图！');
      return;
    }
    if (!imgArray) {
      Toast.show('请上传身份示意图！');
      return;
    }
    CreateApplyDemoService({
      memberId,
      supplyId,
      needAmount,
      identity: identityArray.toString(),
      memo,
      imgUrls: imgArray.toString(),
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        Toast.show('申请拿样成功！');
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
MyBase.propTypes = {
  navigation: PropTypes.object,
};
export default MyBase;
