import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDemandOrderService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderByType: 'desc',
      orderByName: 'modiDate',
      currentPage: '',
      items: [],
      ModalOpen: false,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      demandCategoryId: '',
      demandCategoryName: '',
      distance: '',
      tabs: [{
        label: '智能排序',
        cur: true,
      }, {
        label: '距离排序',
        cur: false,
      }, {
        label: '价格排序',
        cur: false,
      }, {
        label: '筛选',
        cur: false,
      }],
      tabIndex: 0,
    };
  }
  getInit = () => {
    this._onRefresh();
    this.emitTabOrder = DeviceEventEmitter.addListener('emitTabOrder', (data) => {
      const { tabs } = this.state;
      tabs[3].label = data ? data.name : '筛选';
      tabs[3].cur = data !== undefined;
      this.setState({
        demandCategoryId: data ? data.categoryId : '',
        tabs,
      }, this._onRefresh);
    });
    this.emitReloadDemand = DeviceEventEmitter.addListener('emitReloadDemand', () => {
      this._onRefresh();
    });
  }
  deleteInit = () => {
    canEnd = false;
    this.emitTabOrder.remove();
    this.emitReloadDemand.remove();
  }
  GetDemandOrderService = () => {
    const {
      orderByName,
      orderByType,
      pageSize,
      currentPage,
      demandCategoryId,
      distance,
      refresh,
      items,
    } = this.state;
    GetDemandOrderService({
      orderByName,
      orderByType,
      pageSize,
      demandCategoryId,
      distance,
      memberId: global.memberId || '1',
      isFlushDistance: refresh ? '1' : '0',
      longitude: global.longitude || '',
      latitude: global.latitude || '',
      currentPage,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
        result.forEach((list) => {
          list.modiDate = this.computeDate(list.modiDate);
        });
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
            refresh: false,
            noData: false,
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
      // this.setState({
      //   ModalOpen: true,
      // });
      this.props.push({ key: 'DemandCategory', params: { type: 'TabOrder' } });
      return;
    }
    switch (index) {
      case 0:
        orderByName = '';
        break;
      case 1:
        orderByName = 'distance';
        break;
      case 2:
        orderByName = 'servicesPrice';
        break;
      case 3:
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
    }, () => this.GetDemandOrderService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetDemandOrderService());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
