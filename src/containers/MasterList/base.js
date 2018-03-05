import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderByName: '',
      orderByType: 'desc',
      currentPage: '',
      realName: '',
      typeIds: props.navigation.state.params.typeIds,
      items: [],
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      tabs: [{
        label: '智能排序',
        cur: true,
      }, {
        label: '离我最近',
        cur: false,
      }, {
        label: '评价排序',
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
  GetMasterService = () => {
    const {
      orderByName,
      orderByType,
      pageSize,
      currentPage,
      realName,
      refresh,
      typeIds,
      items,
    } = this.state;
    GetMasterService({
      orderByName,
      orderByType,
      pageSize,
      realName,
      typeIds,
      longitude: global.longitude || '',
      latitude: global.latitude || '',
      memberId: global.memberId,
      isFlushDistance: refresh ? '1' : '0',
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
    const { tabs } = this.state;
    let { tabIndex, orderByName, orderByType } = this.state;
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
        orderByName = 'praiseRate';
        break;
      case 3:
        this.setState({
          ModalOpen: true,
        });
        return;
      default:
    }
    if (tabIndex === index) {
      return;
    }
    tabs[index].cur = true;
    tabs[tabIndex].cur = false;
    tabIndex = index;
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
    }, () => this.GetMasterService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetMasterService());
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
