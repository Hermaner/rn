import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateApplyDemoService } from '../../api';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identityList: [{
        id: '1',
        title: '超市',
        isChoose: -1,
      }, {
        id: '1',
        title: '农副加工',
        isChoose: -1,
      }, {
        id: '1',
        title: '贸易公司',
        isChoose: -1,
      }, {
        id: '1',
        title: '餐饮企业',
        isChoose: -1,
      }, {
        id: '1',
        title: '门店老板',
        isChoose: -1,
      }, {
        id: '1',
        title: '网店老板',
        isChoose: -1,
      }, {
        id: '1',
        title: '电商公司',
        isChoose: -1,
      }],
      backGround1: require('../../assets/img/1.png'),
      userInfo: '',
      needAmount: '',
      identity: '',
      supplyId: '',
      memberId: '',
      memo: '',
    };
  }
  getInit = () => {
    const { supplyId } = this.props.navigation.state.params;
    this.setState({
      supplyId,
      memberId: global.memberId,
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
    CreateApplyDemoService({
      memberId,
      supplyId,
      needAmount,
      identity: identityArray.toString(),
      memo,
      imgUrls: imgArray.toString(),
    }).then((res) => {
      console.log(res);
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
}
MyBase.propTypes = {
  navigation: PropTypes.object,
};
export default MyBase;
