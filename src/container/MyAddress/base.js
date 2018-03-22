import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert, DeviceEventEmitter } from 'react-native';
import { GetMemberInfoService, DeleteReceiveAddressService, SetDefaultService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiveAddressId: '',
      ads: [],
      items: [],
    };
  }
  getInit = () => {
    this.GetMemberInfoService();
    this.emitLoad = DeviceEventEmitter.addListener('emitLoad', () => {
      this.GetMemberInfoService();
    });
  }
  deleteInit = () => {
    this.emitLoad.remove();
  }
  GetMemberInfoService = () => {
    this.sleek.toggle();
    GetMemberInfoService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const items = res.data.receiveAddresss;
        if (items.length === 0) {
          this.setState({
            items,
          });
          return;
        }
        items.sort((a, b) => b.isDefault - a.isDefault);
        this.setState({
          items,
          ads: [items[0].receiveAddressId],
          addressId: items[0].receiveAddressId,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  SetDefaultService = (receiveAddressId) => {
    this.sleek.toggle();
    SetDefaultService({
      receiveAddressId,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.setState({
          receiveAddressId,
          ads: [receiveAddressId],
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  DeleteReceiveAddressService = (receiveAddressId) => {
    this.sleek.toggle();
    DeleteReceiveAddressService({
      receiveAddressId,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this.GetMemberInfoService();
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
    const { items, receiveAddressId } = this.state;
    if (items[index].receiveAddressId === receiveAddressId) {
      return;
    }
    this.SetDefaultService(items[index].receiveAddressId);
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
        { text: '确认', onPress: () => this.DeleteReceiveAddressService(items[index].receiveAddressId) },
      ],
    );
  }
  goAddressCreate = () => {
    this.props.push({ key: 'MyAddressCreate', params: {} });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
