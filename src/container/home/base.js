import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetAppCategoryService, GetHomeCategoryService, GetVerifSupplyService, GetGoodBusinesService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainIcons: [{
        icon: 'icon-dating',
        label: '供应大厅',
        color: '#51cd73',
        page: { key: 'MainList' },
      }, {
        icon: 'icon-1',
        label: '行情大厅',
        color: '#6098f9',
        page: { key: 'MainSearch', params: { type: '3' } },
      }, {
        icon: 'icon-zixun',
        label: '行情咨询',
        color: '#f85554',
        page: { key: 'HuinongConsult' },
      }, {
        icon: 'icon-caigou-xianxing',
        label: '发采购',
        color: '#f4bc22',
        page: { key: global.memberId ? 'MainSearch' : 'User', params: { type: '2' } },
      }],
      typeList: [{
        id: 1,
        icn: 'icon-shuiguo',
        isIcn: false,
        text: '',
        name: '水果',
        page: 'MainList',
        color: '#1CC127',
        color1: '#D5F1C4',
      }, {
        id: 1,
        icn: 'icon-shucai',
        isIcn: false,
        text: '',
        name: '蔬菜',
        page: 'User',
        color: '#1CC127',
        color1: '#D5F1C4',
      }, {
        id: 1,
        icn: 'icon-px_pangxie',
        isIcn: false,
        text: '',
        name: '畜牧水产',
        color: '#1CC127',
        color1: '#D5F1C4',
      }, {
        id: 1,
        icn: 'icon-ziyuan',
        isIcn: false,
        text: '',
        name: '全部分类',
        color: '#FF4F51',
        color1: '#EBC3A7',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '辅',
        name: '八月瓜',
        color: '#1CC127',
        color1: '#D5F1C4',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '箱',
        name: '羊',
        color: '#1CC127',
        color1: '#D5F1C4',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '灯',
        name: '苹果',
        color: '#FD6300',
        color1: '#F3D5DB',
      }, {
        id: 1,
        icn: '',
        isIcn: true,
        text: '玻',
        name: '柑橘',
        color: '#FD6300',
        color1: '#F3D5DB',
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
      SampleCenterList: [{
        icn: 'icon-yewuzhongxin',
        text: '样品中心',
        push: 'SampleMainList',
        name: '全部分类',
      }, {
        icn: 'icon-zuixinhuoyuan',
        text: '保障货源',
        push: 'EnsureMainList',
        name: '全部分类',
      }, {
        icn: 'icon-tuijianshangjia',
        text: '推荐商家',
        push: 'RecommendBusiness',
      }],
      loadQueue: [0, 0, 0, 0],
      isRefreshing: false,
      loadMore: false,
      scurrentPage: 1,
      bcurrentPage: 1,
      refresh: false, // 是否是刷新
      loading: false, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      pageSize: '15',
      items: [],
      supplys: [],
      business: [],
      goodsTypeList: [], // 应季好货
      isTabOne: 1,
      backGround1: require('../../assets/img/1.png'),
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
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
          result[i].color1 = typeList[i].color1;
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
    this._onRefreshSupply();
    this._onRefreshBusines();
  }
  GetVerifSupplyService = () => {
    const { scurrentPage, pageSize, supplys, refresh } = this.state;
    GetVerifSupplyService({
      pageSize,
      currentPage: scurrentPage,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            supplys: result,
            scurrentPage: scurrentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = supplys.concat(result);
          this.setState({
            supplys: newItems,
            scurrentPage: scurrentPage + 1,
            loading: false,
          });
        }
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  GetGoodBusinesService = () => {
    const { bcurrentPage, pageSize, business, refresh } = this.state;
    GetGoodBusinesService({
      pageSize,
      currentPage: bcurrentPage,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            business: result,
            bcurrentPage: bcurrentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = business.concat(result);
          this.setState({
            business: newItems,
            bcurrentPage: bcurrentPage + 1,
            loading: false,
          });
        }
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  tabChange = (isTabOne) => {
    this.setState({
      isTabOne,
      nomore: false,
    });
  }
  _onRefreshSupply = () => {
    this.setState({
      refresh: true,
      scurrentPage: 1,
    }, () => this.GetVerifSupplyService());
  }
  _onRefreshBusines = () => {
    this.setState({
      refresh: true,
      bcurrentPage: 1,
    }, () => this.GetGoodBusinesService());
  }
  _onScroll = (event) => {
    const { isTabOne, loading, nomore } = this.state;
    if (loading || nomore) {
      return;
    }
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      this.setState({
        loading: true,
      }, isTabOne === 1 ? this.GetVerifSupplyService : this.GetGoodBusinesService);
    }
  }
}
export default Base;
