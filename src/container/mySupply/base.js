import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import { RefreshSupplyService, StopPurchaseService, GetSupplyService, StopSupplyService, ShelfSupplyService, DeleteSupplyService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
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
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    const { currentPage, pageSize, items, ds, refresh, dataSource } = this.state;
    const { type } = this.props;
    this.sleek.toggle();
    GetSupplyService({
      currentPage,
      pageSize,
      type,
      memberId: '1',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (items.length === 0) {
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
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
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
  btnChange = (btnName, supplyId) => {
    switch (btnName) {
      case '下架':
        this.undercarriage(supplyId);
        console.log('下架');
        break;
      case '修改':
        console.log('修改没做');
        break;
      case '刷新':
        this.renovate(supplyId);
        console.log('刷新');
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
  toggleSleek = () => {
    this.setState({
      isSleekShow: !this.state.isSleekShow,
    });
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
  StopPurchaseService = (purchaseId) => {
    ActionSheet.show(
      {
        options: [
          { text: '停止采购' },
          { text: 'Cancel' },
        ],
        cancelButtonIndex: 1,
        title: '是否停止采购?',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.toggleSleek();
          StopPurchaseService({
            purchaseId,
          }).then((res) => {
            console.log(res);
            this.toggleSleek();
            if (res.isSuccess) {
              Toast.show('操作成功');
              this._onRefresh();
            } else {
              Toast.show(res.msg);
            }
          }).catch((err) => {
            this.toggleSleek();
            Toast.show(err);
          });
        }
      },
    );
  }
}
Base.propTypes = {
  type: PropTypes.string,
};
export default Base;
