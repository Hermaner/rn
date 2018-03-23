import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
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
      isRefreshing: false,
      loadMore: false,
      currentPage: 1,
      loadQueue: [0, 0, 0, 0],
      visitorList: [],
      visitorCount: 0,
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this.getData);
  }
  getData = () => {
    this._onRefreshVisitor();
  }
  GetVisitorService = () => {
    const { memberId, pageSize, currentPage, refresh, visitorList } = this.state;
    GetVisitorService({
      memberId,
      pageSize: '10000',
      currentPage,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = [];
        const aaa = [];
        const time = [];
        const count = [];
        for (const key in res.data) {
          time.push(key.substring(5, 10));
          count.push(res.data[key].length);
          if (res.data[key].length > 0) {
            aaa.push(res.data[key]);
          }
        }
        for (let i = 0; i < aaa.length; i += 1) {
          for (let j = 0; j < aaa[i].length; j += 1) {
            result.push(aaa[i][j]);
          }
        }
        for (let i = 0; i < result.length; i += 1) {
          result[i].isClick = -1;
        }
        this.setState({
          option: {
            ...this.state.option,
            xAxis: {
              data: time.reverse(),
            },
            series: [{
              name: '销量',
              type: 'bar',
              data: count.reverse(),
            }],
          },
        });
        if (res.data === 0) {
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            visitorList: result,
            visitorCount: result.length,
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
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  tellPhone = (index) => {
    const { visitorList } = this.state;
    Communications.phonecall(visitorList[index].member.phone, false);
  }
  clickHidden = (index) => {
    const { visitorList } = this.state;
    if (visitorList.length > 0) {
      for (let i = 0; i < visitorList.length; i += 1) {
        if (i === index) {
          visitorList[i].isClick *= -1;
          this.setState({
            visitorList,
          });
          if (visitorList[i].isClick === 1) {
            for (let j = 0; j < visitorList.length; j += 1) {
              visitorList[j].isClick = -1;
            }
            visitorList[i].isClick = 1;
            this.setState({
              visitorList,
            });
          }
        }
      }
    }
  }
  chatPeople = (item) => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (item.member.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: item.member.memberId,
          userName: item.member.nickName,
          imgUrl: item.member.imgUrl,
        },
      },
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
MyVisitorBase.propTypes = {
  push: PropTypes.func,
};
export default MyVisitorBase;
