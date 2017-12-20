import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class AdjectiveInfoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [{
        id: '1',
        label: '批发商',
        cur: false,
      }, {
        id: '1',
        label: '代办/代理人',
        cur: false,
      }, {
        id: '1',
        label: '合作社',
        cur: false,
      }, {
        id: '1',
        label: '家庭农场',
        cur: false,
      }, {
        id: '1',
        label: '种植户/种植企业',
        cur: false,
      }, {
        id: '1',
        label: '农机厂商',
        cur: false,
      }, {
        id: '1',
        label: '贸易公司',
        cur: false,
      }, {
        id: '1',
        label: '农资经销商',
        cur: false,
      }, {
        id: '1',
        label: '农产品加工',
        cur: false,
      }, {
        id: '1',
        label: '农机经销商',
        cur: false,
      }, {
        id: '1',
        label: '酒店',
        cur: false,
      }, {
        id: '1',
        label: '超市',
        cur: false,
      }, {
        id: '1',
        label: '餐饮店',
        cur: false,
      }, {
        id: '1',
        label: '酒店',
        cur: false,
      }, {
        id: '1',
        label: '超市',
        cur: false,
      }],
      typeIndex: '',
      isName: false,
      changeOne: 0,
    };
  }
  userIdentity = (index) => {
    const { typeList, typeIndex } = this.state;
    if (typeIndex === index) {
      return;
    }
    typeList[index].cur = true;
    typeList[typeIndex].cur = false;
    this.setState({
      typeList,
      typeIndex: index,
    });
  }
  identityChange1 = () => {
    this.setState({
      changeOne: 1,
    });
  }
  identityChange2 = () => {
    this.setState({
      changeOne: 2,
    });
  }
}
export default AdjectiveInfoBase;
