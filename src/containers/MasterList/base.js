import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterService, GetMasterTypeService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const { typeIds, typeIndex, typeI } = props.navigation.state.params;
    this.state = {
      orderByName: '',
      orderByType: 'desc',
      currentPage: '',
      realName: '',
      typeIds,
      typeIndex,
      typeI,
      items: [],
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      types: [],
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
    this.GetMasterTypeService();
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
            noData: false,
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
  GetMasterTypeService = () => {
    const { typeIndex, typeI } = this.state;
    GetMasterTypeService().then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const types = res.data;
        if (typeIndex !== 'none') {
          types[typeIndex].childs[typeI].cur = true;
        }
        this.setState({
          types: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  selectType = (index, i) => {
    const { types, typeIndex, typeI } = this.state;
    if (index === typeIndex && i === typeI) {
      return;
    }
    types[index].childs[i].cur = true;
    if (typeIndex !== 'none') {
      types[typeIndex].childs[typeI].cur = false;
    }
    const typeIds = types[index].childs[i].id;
    this.setState({
      typeIds,
      typeIndex: index,
      typeI: i,
    }, this._onRefresh);
  }
  selectAllType = () => {
    const { types, typeIndex, typeI } = this.state;
    if (typeIndex !== 'none') {
      types[typeIndex].childs[typeI].cur = false;
    }
    this.setState({
      typeIds: '',
      typeIndex: 'none',
      typeI: 'none',
    }, this._onRefresh);
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
