import React from 'react';
import * as WeChat from 'react-native-wechat';
import Alipay from 'react-native-yunpeng-alipay';

class HuinongConsultBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [{
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
        title: '2017年12月25日鸡蛋价格行情',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        title: '今日朝鲜人名军正式跟美军宣布开战',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        title: '好吃不如饺子，好玩不如筛子',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg',
        title: '噫吁嚱，金戈铁马，气吞万里如虎',
      }],
      loadQueue: [0, 0, 0, 0],
    };
  }
  loadHandle = (i) => {
    const loadQueue = this.state.loadQueue;
    loadQueue[i] = 1;
    this.setState({
      loadQueue,
    });
  }
}
export default HuinongConsultBase;
