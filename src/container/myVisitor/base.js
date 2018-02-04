import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetVisitorService } from '../../api';

class MyVisitorBase extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      option: {
        title: {
          text: '',
        },
        tooltip: {},
        legend: {
          data: [],
        },
        xAxis: {
          data: ['01-11', '01-11', '01-11', '01-11', '01-11', '01-11', '01-11'],
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20, 3],
        }],
      },
      refresh: false, // 是否是刷新
      loading: false, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      pageSize: '15',
      isRefreshing: false,
      loadMore: false,
      currentPage: 1,
      loadQueue: [0, 0, 0, 0],
      visitorList: [],
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this.getData);
  }
  getData = () => {
    this._onRefreshVisitor();
  }
  getNowFormatDate = () => {
    const date = new Date();
    const seperator1 = '-';
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = `0${month}`;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = `0${strDate}`;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
  GetVisitorService = () => {
    const { memberId, pageSize, currentPage, refresh, visitorList } = this.state;
    GetVisitorService({
      memberId,
      pageSize,
      currentPage,
    }).then((res) => {
      if (res.isSuccess) {
        console.log('tttttttttuuuuuuuuuu', res);
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
            visitorList: result,
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = visitorList.concat(result);
          this.setState({
            visitorList: newItems,
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _onRefreshVisitor = () => {
    this.setState({
      refresh: true,
      scurrentPage: 1,
    }, () => this.GetVisitorService());
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

export default MyVisitorBase;
