import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetOrderService } from '../../api';

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
      tabs: [{
        label: '需求单',
        cur: true,
      }, {
        label: '待付款',
        cur: false,
      }, {
        label: '待服务',
        cur: false,
      }, {
        label: '待评价',
        cur: false,
      }, {
        label: '退款/售后',
        cur: false,
      }],
      tabIndex: 0,
    };
  }
  getInit = () => {
    this._onRefresh();
  }
  GetOrderService = () => {
    const {
      status,
      pageSize,
      currentPage,
      refresh,
      ds,
      items,
      dataSource,
    } = this.state;
    GetOrderService({
      pageSize,
      status,
      currentPage,
      memberId: global.memberId,
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
  changeTab = (index) => {
    const { tabs } = this.state;
    let { tabIndex, orderByName, orderByType } = this.state;
    if (index === 3) {
      this.setState({
        ModalOpen: true,
      });
      return;
    }
    switch (index) {
      case 0:
        orderByName = '';
        break;
      case 1:
        orderByName = 'sales';
        break;
      case 2:
        orderByName = 'salesPrice';
        break;
      default:
    }
    if (tabIndex === index) {
      if (index === 0 || index === 1) {
        return;
      }
      orderByType = orderByType === 'desc' ? 'asc' : 'desc';
    } else {
      orderByType = 'desc';
      tabs[index].cur = true;
      tabs[tabIndex].cur = false;
      tabIndex = index;
    }
    this.setState({
      orderByName,
      orderByType,
      tabs,
      tabIndex,
    }, this._onRefresh);
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetOrderService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetOrderService());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
  status: PropTypes.string,
};
export default Base;
