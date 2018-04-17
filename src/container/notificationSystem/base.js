import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetMessageService } from '../../api';

let canEnd = false;
class NotificationSystemBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
    this.emitMineUser = DeviceEventEmitter.addListener('notificationSystem', () => {
      this.notificationSystem();
    });
  }
  getDelete = () => {
    this.emitMineUser.remove();
  }
  getData = () => {
    const { currentPage, pageSize, items, refresh, memberId } = this.state;
    const { type } = this.props;
    GetMessageService({
      currentPage,
      pageSize,
      memberId,
      type,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
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
            currentPage: currentPage + 1,
            noData: false,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
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
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  notificationSystem = () => {
    this.getInit();
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
}
NotificationSystemBase.propTypes = {
  type: PropTypes.string,
};
export default NotificationSystemBase;
