import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { RefreshSupplyService, GetSupplyService, StopSupplyService, ShelfSupplyService, DeleteSupplyService } from '../../api';

let canEnd = false;
class Base extends React.Component {
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
      type1: [{
        id: 1,
        title: '下架',
        isBtn: false,
      }, {
        id: 1,
        title: '修改',
        isBtn: false,
      }, {
        id: 1,
        title: '刷新',
        isBtn: true,
      }],
      type2: [{
        id: 1,
        title: '删除',
        isBtn: false,
      }, {
        id: 1,
        title: '修改',
        isBtn: false,
      }, {
        id: 1,
        title: '上架',
        isBtn: true,
      }],
      type3: [{
        id: 1,
        title: '删除',
        isBtn: false,
      }, {
        id: 1,
        title: '修改',
        isBtn: true,
      }],
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
    this.supplyRefresh = DeviceEventEmitter.addListener('supplyRefresh', () => {
      this._onRefresh();
    });
  }
  getDelete = () => {
    this.supplyRefresh.remove();
  }
  getData = () => {
    const { currentPage, pageSize, items, refresh, memberId } = this.state;
    const { type } = this.props;
    GetSupplyService({
      currentPage,
      pageSize,
      type,
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
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
  renovate = (supplyId) => {
    this.sleek.toggle();
    RefreshSupplyService({
      supplyId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        this._onRefresh();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  emitMySupply = () => {
    this._onRefresh();
  }
  initData = () => {
    this.emitMineMySupply = DeviceEventEmitter.addListener('emitMySupply', () => {
      this.emitMySupply();
    });
  }
  undercarriage = (supplyId) => {
    this.sleek.toggle();
    StopSupplyService({
      supplyId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        this._onRefresh();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  ShelfSupplyService = (supplyId) => {
    this.sleek.toggle();
    ShelfSupplyService({
      supplyId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        this._onRefresh();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  DeleteSupplyService = (supplyId) => {
    this.sleek.toggle();
    DeleteSupplyService({
      supplyId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        this._onRefresh();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  btnChange = (btnName, supplyId, index) => {
    const { items } = this.state;
    switch (btnName) {
      case '下架':
        this.undercarriage(supplyId);
        break;
      case '修改':
        console.log(items[index]);
        this.props.push({ key: 'CgyxComfirm', params: { item: items[index] } });
        break;
      case '刷新':
        this.renovate(supplyId);
        break;
      case '上架':
        this.ShelfSupplyService(supplyId);
        break;
      case '删除':
        this.DeleteSupplyService(supplyId);
        break;
      default:
        break;
    }
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
Base.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  push: PropTypes.func,
};
export default Base;
