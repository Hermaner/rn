import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterOrderService } from '../../api';

require('moment/locale/zh-cn');
const moment = require('moment');

moment.locale('zh-cn');
let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      currentPage: '',
      items: [],
      ds,
      status: props.status,
      dataSource: ds.cloneWithRows([]),
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
    };
  }
  getInit = () => {
    this._onRefresh();
  }
  GetMasterOrderService = () => {
    const {
      status,
      pageSize,
      currentPage,
      refresh,
      ds,
      items,
      dataSource,
    } = this.state;
    GetMasterOrderService({
      pageSize,
      status,
      isFlushDistance: refresh ? '1' : '0',
      longitude: '',
      latitude: '',
      currentPage,
      masterId: global.masterId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
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
        result.forEach((item) => {
          item.modiDate = moment(item.modiDate).startOf('minute').fromNow();
        });
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
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  computeDate = (time) => {
    let target = (new Date().getTime() - new Date(time).getTime()) / 1000 / 60;
    if (target < 60) {
      target = parseInt(target, 10);
      return `${target}分钟前`;
    } else if (target >= 60 && target < (24 * 60)) {
      target = parseInt(target / 60, 10);
      return `${target}小时前`;
    }
    return time.substr(0, 10);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetMasterOrderService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetMasterOrderService());
    }
  }
}
Base.propTypes = {
  status: PropTypes.string,
};
export default Base;
