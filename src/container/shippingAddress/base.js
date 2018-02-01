import React from 'react';
import { ListView, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetMemberInfoService, DeleteReceiveAddressService, SetDefaultService } from '../../api';

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
      info: '',
      currentPage: 1,
      pageSize: '15',
      memberId: '',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      name: '',
      phone: '',
      adressId: '',
      Province: '',
      City: '',
      District: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const {
      currentPage,
      pageSize,
      items,
      ds,
      refresh,
      dataSource,
      memberId } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.receiveAddresss;
        this.setState({
          name: result[0].name,
          phone: result[0].phone,
          adressId: result[0].receiveAddressId,
          Province: result[0].receiveProvinceName,
          City: result[0].receiveCityName,
          District: result[0].receiveDistrictName,
        });
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
  back = () => {
    const { name, phone, adressId, Province, City, District } = this.state;
    const data = { name, phone, adressId, Province, City, District };
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'getOrderDetail':
        emit = 'getOrderDetail';
        break;
      default:
    }
    DeviceEventEmitter.emit(emit, data);
    this.props.pop();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
