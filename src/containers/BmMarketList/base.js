import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetBmMarketService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderByName: '',
      orderByType: 'desc',
      currentPage: '',
      bmMarketName: '',
      items: [],
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      tabs: [{
        label: '默认排序',
        cur: true,
      }, {
        label: '离我最近',
        cur: false,
      }, {
        label: '热度排序',
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
  }
  deleteInit = () => {
    canEnd = false;
  }
  GetBmMarketService = () => {
    const {
      orderByName,
      orderByType,
      bmMarketName,
      pageSize,
      currentPage,
      refresh,
      items,
    } = this.state;
    GetBmMarketService({
      orderByName,
      orderByType,
      bmMarketName,
      isFlushDistance: refresh ? '1' : '0',
      longitude: global.longitude || '',
      latitude: global.latitude || '',
      pageSize,
      memberId: global.memberId || global.registration,
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
  changeTab = (index) => {
    const { tabs, tabIndex } = this.state;
    let { orderByName, orderByType } = this.state;
    if (tabIndex === index) {
      return;
    }
    orderByType = 'desc';
    switch (index) {
      case 0:
        orderByName = '';
        break;
      case 1:
        orderByName = 'distance';
        orderByType = 'asc';
        break;
      case 2:
        orderByName = 'browsingVolume';
        break;
      case 3:
        orderByName = 'browsingVolume';
        break;
      default:
    }
    tabs[index].cur = true;
    tabs[tabIndex].cur = false;
    this.setState({
      orderByName,
      orderByType,
      tabs,
      tabIndex: index,
    }, this._onRefresh);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetBmMarketService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetBmMarketService());
    }
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
