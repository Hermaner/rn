import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { GetMemberAddressService, DeleteMemberAddressService, UpdateMemberAddressDefaultService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressId: '',
      ads: [],
      items: [],
    };
  }
  getInit = () => {
    this.GetMemberAddressService();
    this.emitLoad = DeviceEventEmitter.addListener('emitLoad', () => {
      this.GetMemberAddressService();
    });
  }
  deleteInit = () => {
    this.emitLoad.remove();
  }
  GetMemberAddressService = () => {
    this.sleek.toggle();
    GetMemberAddressService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data;
        if (items.length === 0) {
          return;
        }
        res.data.sort((a, b) => b.isDefault - a.isDefault);
        this.setState({
          items,
          ads: [items[0].addressId],
          addressId: items[0].addressId,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  UpdateMemberAddressDefaultService = (addressId) => {
    this.sleek.toggle();
    UpdateMemberAddressDefaultService({
      addressId,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          addressId,
          ads: [addressId],
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  DeleteMemberAddressService = (addressId) => {
    this.sleek.toggle();
    DeleteMemberAddressService({
      addressId,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.GetMemberAddressService();
        Toast.show('删除成功');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  backCheck = (index) => {
    const { items, addressId } = this.state;
    if (items[index].addressId === addressId) {
      return;
    }
    this.UpdateMemberAddressDefaultService(items[index].addressId);
  }
  edit = (index) => {
    const { items } = this.state;
    this.props.push({ key: 'MyAddressCreate', params: { item: items[index] } });
  }
  deleteItem = (index) => {
    const { items } = this.state;
    Alert.alert(
      '温馨提示', '删除该地址?',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认', onPress: () => this.DeleteMemberAddressService(items[index].addressId) },
      ],
    );
  }
  goAddressCreate = () => {
    this.props.push({ key: 'MyAddressCreate' });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
