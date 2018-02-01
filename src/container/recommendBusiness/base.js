import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetGoodBusinesService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this._onRefreshBusines();
  }
  GetGoodBusinesService = () => {
    const { bcurrentPage, pageSize, business, refresh } = this.state;
    GetGoodBusinesService({
      pageSize,
      currentPage: bcurrentPage,
    }).then((res) => {
      if (res.isSuccess) {
        console.log('666666666666666666', res);
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
