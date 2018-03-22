import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetGoodBusinesService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loadMore: false,
      currentPage: 1,
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
    this._onRefreshBusines();
  }
  GetGoodBusinesService = () => {
    const { currentPage, pageSize, business, refresh } = this.state;
    GetGoodBusinesService({
      pageSize,
      currentPage,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
            });
            return;
          }
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            business: result,
            currentPage: currentPage + 1,
            refresh: false,
            noData: false,
            nomore: false,
          });
        } else {
          const newItems = business.concat(result);
          this.setState({
            business: newItems,
            currentPage: currentPage + 1,
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
        this.setState({
          refresh: false,
          nomore: true,
          loading: false,
        });
        Toast.show(res.msg);
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
      currentPage: 1,
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
