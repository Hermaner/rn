import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetAppCategoryService, GetHomeCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [{
        id: 1,
        icn: 'icon-shuiguo',
        isIcn: false,
        text: '',
        name: '水果',
        page: 'MainList',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'icon-shucai',
        isIcn: false,
        text: '',
        name: '蔬菜',
        page: 'User',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'icon-px_pangxie',
        isIcn: false,
        text: '',
        name: '畜牧水产',
        color: '#1CC127',
      }, {
        id: 1,
        icn: 'icon-ziyuan',
        isIcn: false,
        text: '',
        name: '全部分类',
        color: '#FF4F51',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '辅',
        name: '八月瓜',
        color: '#1CC127',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '箱',
        name: '羊',
        color: '#1CC127',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '灯',
        name: '苹果',
        color: '#FD6300',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '玻',
        name: '柑橘',
        color: '#FD6300',
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
      pageSize: '5',
      items: [],
      goodsTypeList: [], // 应季好货
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    const { typeList } = this.state;

    GetAppCategoryService({
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data[0].childs;
        result.length = 8;
        this.setState({
          goodGoodsList: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      console.log(err);
    });

    GetHomeCategoryService({
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          result[i].isIcn = typeList[i].isIcn;
          result[i].text = typeList[i].text;
          result[i].icn = typeList[i].icn;
          result[i].color = typeList[i].color;
          if (i === 3) {
            result.splice(3, 0, typeList[3]);
          }
        }
        this.setState({
          goodsTypeList: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
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
