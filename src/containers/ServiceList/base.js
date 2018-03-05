import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterServicesService, GetCategoryService, DeepClone } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderByName: '',
      orderByType: '',
      currentPage: '',
      seachValue: '',
      items: [],
      categoryParentId: '',
      categoryId: '',
      distance: '',
      oneIndex: null,
      twoIndex: null,
      popItems: [],
      resetCategory: null,
      ModalOpen: false,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      tabs: [{
        label: '智能排序',
        cur: true,
      }, {
        label: '销量优先',
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
    this.GetCategoryService();
  }
  GetMasterServicesService = () => {
    const {
      orderByName,
      orderByType,
      pageSize,
      currentPage,
      seachValue,
      refresh,
      items,
      categoryParentId,
      categoryId,
      distance,
    } = this.state;
    GetMasterServicesService({
      orderByName,
      orderByType,
      pageSize,
      categoryParentId,
      categoryId,
      distance,
      longitude: global.longitude || '',
      latitude: global.latitude || '',
      isFlushDistance: refresh ? '1' : '0',
      name: seachValue,
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
  resetModal = () => {
    const { resetCategory } = this.state;
    this.setState({
      categoryParentId: '',
      categoryId: '',
      oneIndex: null,
      twoItems: [],
      popItems: resetCategory,
    }, this._onRefresh);
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
  tabOneItem = (index) => {
    const { resetCategory, oneIndex } = this.state;
    const popItems = DeepClone(resetCategory);
    popItems[index].cur = index !== oneIndex;
    this.setState({
      popItems,
      categoryParentId: index === oneIndex ? '' : popItems[index].categoryId,
      categoryId: '',
      oneIndex: index === oneIndex ? null : index,
      twoItems: index === oneIndex ? [] : popItems[index].categorys,
      twoIndex: null,
    }, this._onRefresh);
  }
  tabTwoItem = (index) => {
    const { twoItems, twoIndex } = this.state;
    if (twoIndex === index) {
      return;
    }
    if (twoIndex !== null) {
      twoItems[twoIndex].cur = false;
    }
    twoItems[index].cur = true;
    this.setState({
      twoIndex: index,
      categoryId: twoItems[index].categoryId,
      twoItems,
    }, this._onRefresh);
  }
  GetCategoryService = () => {
    GetCategoryService({
      parentId: '0',
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          popItems: res.data,
          resetCategory: DeepClone(res.data),
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
      isFlushDistance: '1',
    }, () => this.GetMasterServicesService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetMasterServicesService());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
