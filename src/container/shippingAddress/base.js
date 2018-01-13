import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetMemberInfoService, DeleteReceiveAddressService, SetDefaultService } from '../../api';

let canEnd = false;
class ShippingAddressBase extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      items: [],
      info: '',
      currentPage: 1,
      pageSize: '15',
      memberId: '',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    const { currentPage, pageSize, items, ds, refresh, dataSource } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId: '1',
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.receiveAddresss;
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
  deleteAdress = (receiveAddressId) => {
    this.sleek.toggle();
    DeleteReceiveAddressService({
      receiveAddressId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this._onRefresh();
        console.log(res);
        setTimeout(() => { canEnd = true; }, 0);
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
  defaultAdress = (receiveAddressId) => {
    this.sleek.toggle();
    const { memberId } = this.state;
    SetDefaultService({
      receiveAddressId,
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this._onRefresh();
        console.log(res);
        setTimeout(() => { canEnd = true; }, 0);
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.toggleSleek();
      Toast.show(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
}
export default ShippingAddressBase;
