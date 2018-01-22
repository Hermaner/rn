import React from 'react';
import Toast from 'react-native-simple-toast';
import { ListView } from 'react-native';
import { GetVerifSupplyService, GetAppCategoryService, GetHomeCategoryService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
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
      ds,
      dataSource: ds.cloneWithRows([]),
      currentPage: 1,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      pageSize: '5',
      items: [],
      goodsTypeList: [], // 应季好货
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    const { currentPage, pageSize, items, ds, refresh, dataSource, typeList } = this.state;
    GetVerifSupplyService({
      pageSize,
      currentPage,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (items.length === 0) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
            dataSource: ds.cloneWithRows(result),
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            dataSource: dataSource.cloneWithRows(newItems),
            currentPage: currentPage + 1,
            loading: false,
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
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
      Toast.show(err);
    });

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
      Toast.show(err);
    });

    GetHomeCategoryService({
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        console.log(result);
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
      Toast.show(err);
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
