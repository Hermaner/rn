import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import { GetMemberInfoService } from '../../api';

class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [{
        img: require('../../assets/img/zhi.png'),
        cardName: '支付宝支付',
        money: '单笔最高2000-50万',
        label: '查看详细限额',
        isBorder: true,
      }, {
        img: require('../../assets/img/wei.png'),
        cardName: '微信支付',
        money: '单笔最高5000-5万',
        label: '查看详细限额',
        isBorder: true,
      }, {
        img: require('../../assets/img/dg.png'),
        cardName: '快捷支付',
        money: '单笔最高2万-50万',
        label: '查看详细限额',
        isBorder: true,
      }],
      tb: require('../../assets/img/zhi.png'),
    };
  }
  getData = () => {

  }
}
export default MyBase;
