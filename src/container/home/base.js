import React from 'react';
import { ListView } from 'react-native';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      goodsTypeList: [{
        id: 1,
        icn: 'analytics',
        title: '水果',
        page: 'MainList',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'analytics',
        title: '蔬菜',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'analytics',
        title: '畜牧水产',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'analytics',
        title: '全部分类',
        color: '#FF4F51',
      }, {
        id: 1,
        icn: 'analytics',
        title: '八月瓜',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'analytics',
        title: '羊',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'analytics',
        title: '苹果',
        color: '#FD6300',
      }, {
        id: 1,
        icn: 'analytics',
        title: '柑橘',
        color: '#FD6300',
      }],
      seasonalGoodsList: [{
        id: 1,
        title: '橙子',
        label: '量大质优',
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
      }, {
        id: 1,
        title: '种苗',
        label: '品种优良',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }, {
        id: 1,
        title: '苹果',
        label: '货源充足',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }, {
        id: 1,
        title: '水果种苗',
        label: '存活率高',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }, {
        id: 1,
        title: '红薯',
        label: '1件起批',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }, {
        id: 1,
        title: '红枣',
        label: '肉厚核小',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }, {
        id: 1,
        title: '辣椒',
        label: '质优价好',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }, {
        id: 1,
        title: '核桃',
        label: '肉厚饱满',
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
      }],
      imgList: [{
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=2f9d83d7798b4710ce2ffdc4f3f5c2fd/d043ad4bd11373f0173e1469af0f4bfbfaed04c6.jpg',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=ff1c4712861001e94e3c1407883579ec/ca1349540923dd540a9ea993da09b3de9d82485f.jpg',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=b549acddf6faaf5184e381b7bc6f95ee/4034970a304e251fee98e003ac86c9177e3e53d9.jpg',
      }],
      loadQueue: [0, 0, 0, 0],
      ds,
      dataSource: ds.cloneWithRows([
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' }]),
      loading: true,
      nomore: false,
      refresh: false,
    };
  }
}
export default Base;
