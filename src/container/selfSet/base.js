import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';
import { GetIdentityService } from '../../api';

class SelfSetBase extends React.Component {
  getInit = () => {
    this.GetIdentityService();
    global.storage.load({
      key: 'userData',
    }).then((ret) => {
      console.log(ret);
      global.memberId = ret.memberId;
      console.log(global.memberId)
      this.setState({
        memberId: ret.memberId,
        imgUrl: ret.imgUrl,
        phone: ret.phone,
        identityName: ret.identityName,
      });
    }).catch(() => {
      console.log('没有用户数据');
    });
  }
  GetIdentityService = () => {
    GetIdentityService()
    .then((res) => {
      this.setState({
        items: res.data,
      });
    });
  }
}
export default SelfSetBase;
