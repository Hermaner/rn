import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetSpecService } from '../../api';
import { Global } from '../../utils';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categoryId: '',
      isBtnGray: true,
      mySpecName: '',
      chooseOne: '',
    };
  }
  GetSpecService = () => {
    const { categoryId } = this.props.navigation.state.params;
    this.sleek.toggle();
    GetSpecService({
      categoryId,
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        if (res.data && res.data.length > 0) {
          for (let i = 0; i < res.data.length; i += 1) {
            res.data[i].specs.push({
              specId: '0',
              specName: '输入规格',
            });
          }
        }
        this.setState({
          items: res.data,
        });
      } else {
        global.Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      global.console.log(err);
    });
  }
  tabView = (index, i) => {
    const { items } = this.state;
    this.setState({
      chooseOne: index,
    });
    if (i === items[index].specs.length - 1) {
      this.ModalView.showModal();
    }
    const itemIndex = items[index].itemIndex;
    items[index].specs[i].cur = true;
    if (itemIndex === i) {
      return;
    }
    if (itemIndex !== undefined) {
      items[index].specs[itemIndex].cur = false;
    }
    items[index].specs[i].cur = true;
    items[index].itemIndex = i;
    let isBtnGray = false;
    if (Global.skuType === '3' || Global.skuType === '4') {
      items.forEach((item) => {
        if (item.itemIndex === undefined) {
          isBtnGray = true;
        }
      });
    }
    this.setState({
      items,
      isBtnGray,
    });
  }
  saveSpecName = (mySpecName) => {
    this.setState({
      mySpecName,
    });
  }
  saveChoose = () => {
    const { mySpecName, items, chooseOne } = this.state;
    if (!mySpecName) {
      Toast.show('请填写您的规格！');
      return;
    }
    for (let i = 0; i < items.length; i += 1) {
      items[chooseOne].specs[items[chooseOne].specs.length - 1].specName = mySpecName;
    }
    if (items && items.length > 0) {
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].cur) {
          items[i].cur = false;
        }
      }
    }
    this.ModalView.closeModal();
    this.setState({
      items,
    });
  }
  saveSkus = () => {
    const { isBtnGray, items } = this.state;
    for (let i = 0; i < items.length; i += 1) {
      for (let k = 0; k < items[i].specs.length; k += 1) {
        if (items[i].specs[k].cur) {
          if (items[i].specs[k].specName === '输入规格') {
            Toast.show('请填写您的规格！');
            return;
          }
        }
      }
    }
    if (isBtnGray) {
      return;
    }
    DeviceEventEmitter.emit('getCgyxSku', items);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
